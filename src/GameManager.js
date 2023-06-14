import { useRecoilState } from "recoil";
import { Client, Server, Handlers, Messages } from "./socket";
import handler from "./socket/handler";
import {
  GameStat,
  GameNotification,
  DebugNotification,
  Room,
  GameConfig,
  GameMessage,
  GameStatDefault,
  RoomDefault,
} from "./state";
import adapt from "./socket/adapter-recoil";
import _, { isEqual } from "underscore";
import { useNotification } from "./state/notification";
import { ModeGame, ModeGameDefault, StateGameMode } from "./state/mode";
import * as Tone from "tone";

class GameManager {
  constructor(client) {
    this.client = client;
    this.label = "Game Manager";
    this.state = {};
    this.room = {};
    this.played_cards = [];
    this.pollID = undefined; // we keep this handy to stop the polling when the room is inactive9
    this.player = new Tone.Players({
      default: "/src/assets/action_default.wav",
      specialPowers: "/src/assets/action_special_power.wav",
    }).toDestination();
  }

  test() {
    this.gameState().notification.add("hello");
  }

  setup() {
    try {
      this.client.connect();
      client.addHandler(
        "connect",
        (() => {
          return (msg) => {
            this.addMessage(`🔌 connected`);
            const { room } = this.room;
            const { name, user } = room;
            if (name && user) {
              this.joinGame({
                game: name,
                username: user,
              });
            }
          };
        })()
      );
      client.addHandler("error", Handlers.errorHandler(this.gameState()));
      client.addHandler(
        "play_card",
        Handlers.playCard(this.played_cards, this.gameState())
      );
      client.addHandler("heartbeat", Handlers.heartBeatHandler());
      client.addHandler("disconnect", Handlers.disconnectHandler);
      client.addHandler("connect_error", Handlers.errorHandler);
      client.addHandler("text_response", Handlers.textResponseMessageHandler);
      // client.addHandler("endgame", Handlers.endGame(this.gameState()));

      client.addHandler(
        "create_room:progress",
        Handlers.createRoomProgress(this.gameState())
      );

      client.addHandler("vote_cancel", Handlers.voteCancel(this.gameState()));
      client.addHandler(
        "action_performed",
        Handlers.actionPerformedHandler(this.gameState())
      );
      client.addHandler(
        "round_start",
        Handlers.roundStartHandler(this.gameState())
      );
      client.addHandler(
        "round_end",
        Handlers.roundEndHandler(this.gameState())
      );
      client.addHandler("about_game", Handlers.aboutGameHandler(this));
      client.addHandler("endgame", Handlers.endGame(this.gameState()));

      this.client.enableHandlers();
    } catch (err) {
      console.log("Error Setting up Client", err);
    }
  }

  teardown() {
    try {
      clearInterval(this.pollID);
      this.client.disconnect();
    } catch (err) {
      console.log("error tearing down manager");
    }
  }

  useGameState() {
    const [gameStat, setGameStat] = useRecoilState(GameStat);
    const [room, setRoom] = useRecoilState(Room);
    const [gameConfig, setGameConfig] = useRecoilState(GameConfig);
    const [gameMessage, setGameMessage] = useRecoilState(GameMessage);
    const [mode, setMode] = useRecoilState(StateGameMode);
    const { notification, add, reset } = useNotification();

    this.state = { gameStat, setGameStat };
    this.room = { room, setRoom };
    this.gameConfig = { gameConfig, setGameConfig };
    this.gameMessage = { gameMessage, setGameMessage };
    this.notification = { notification, add, reset };
    this.mode = { mode, setMode };

    return { gameStat, room, gameConfig, gameMessage, add };
  }

  async createRoom({ playerCount, password, userName }) {
    console.log("create room called");
    this.gameState().notification.add("Creating Room");
    try {
      const message = Messages.make.createGame(playerCount, password);
      const { game } = await this.client.messageWithAck(message);
      this.notification.reset();
      this.room.setRoom({
        name: game.name,
        password,
        user: userName,
      });
      return { game };
    } catch (err) {
      console.error(err);
      this.notification.add("Error Creating Room");
      setTimeout(() => {
        this.notification.reset();
      }, 1500);
      return undefined;
    }
  }

  async joinGame({ game, username }) {
    console.log("join room called", { game, username });
    // this.notification.add("loading");
    try {
      const message = Messages.make.joinGame(game, username);
      const { about } = await this.client.messageWithAck(message);
      console.log(about);
      const { players, current, totalGlobalBias, affinities } = adapt(
        "about_game",
        about
      );
      console.debug("room", this.room);
      this.room.setRoom({
        ...this.room.room,
        state: undefined,
        players,
        current,
        totalGlobalBias,
        affinities,
      });
      this.notification.reset();
    } catch (err) {
      console.debug("could not join room");
      console.log(err);
      this.notification.add("Error joining Room");
      setTimeout(() => {
        this.notification.reset();
      }, 1500);
    }
  }

  leaveRoom() {
    this.room.setRoom({
      id: undefined,
      name: undefined,
      password: undefined,
      me: undefined,
      state: undefined,
    });
    this.gameState().reset();
    this.client.disconnect();
  }

  async playerAction(actionType, actionPayload) {
    // console.debug("player action called");

    this.notification.add("loading");

    try {
      switch (actionType) {
        case "action_keep_card":
          var message = Messages.make.actionKeepCard(actionPayload);
          await this.client.messageWithAck(message);
          break;
        case "action_pass_card":
          var message = Messages.make.actionPassCard(actionPayload);
          await this.client.messageWithAck(message);
          break;
        case "action_discard_card":
          var message = Messages.make.actionDiscardCard(actionPayload);
          await this.client.messageWithAck(message);
          break;
        case "encyclopedia_search":
          var message = Messages.make.actionSearchEncyclopaedia(actionPayload);
          var { message } = await this.client.messageWithAck(message);
          this.gameState().encyclopaedia.show(message);
          break;
        case "fake_news":
          var message = Messages.make.actionFakeNews(actionPayload);
          var { card } = await this.client.messageWithAck(message);
          this.gameState().card.changeText(card.fake_headline);
          break;
        case "mark_as_fake":
          var message = Messages.make.actionMarkAsFake(actionPayload);
          await this.client.messageWithAck(message);
          this.gameState().card.reset();
          break;
        case "vote_cancel":
          var message = Messages.make.actionVoteToCancel(actionPayload);
          return this.client.messageWithAck(message);
        case "viral_spiral_call":
          var message = Messages.make.actionViralSpiral(actionPayload);
          await this.client.messageWithAck(message);
          // this.gameState().viralspiral.selectPlayers();
          break;
        default:
          console.debug("Unsupported Action");
          this.addMessage(`⚠️ Unsupported Action`);
      }
      this.notification.reset();
    } catch (err) {
      this.notification.add("Error");
      setTimeout(() => {
        this.notification.reset();
      }, 1500);
    }
  }

  /**
   * deprecated
   * to be replaced with state().notification.add('message goes herethis.')
   * @param {} message
   */
  addMessage(message) {
    const { gameMessage, setGameMessage } = this.gameMessage;
    setGameMessage([message, ...gameMessage.slice(0, 50)]);
  }

  /**
   * Provides a clear API for modifying the game state
   * The function names should map to the domain language used by everyone
   * in the team and encapsulate state modification logic
   */
  gameState() {
    const { gameStat, setGameStat } = this.state;
    const { setMode } = this.mode;

    return {
      mode: {
        reset: () => {
          setMode({ id: ModeGame.DEFAULT });
        },
        setToEnd: () => {
          setMode({ id: ModeGame.FINISHED });
        },
      },
      encyclopaedia: {
        show: (message) => {
          const { title, content, author } = message;
          setMode({
            id: ModeGame.ENCYCLOPEDIA_SEARCH_RESULT,
            payload: { title, content, author },
          });
        },
      },
      card: {
        set: (card) => {
          setGameStat({ ...gameStat, card: card });
        },
        reset: () => {
          setGameStat({ ...gameStat, card: undefined });
        },
        changeText: (newText) => {
          setGameStat({
            ...gameStat,
            card: { ...gameStat.card, description: newText },
          });
        },
      },
      cancelVote: {
        showAffinitySelector: () => {
          setMode({ id: ModeGame.CANCEL_AFFINITY_SELECTOR });
        },
        hideAffinitySelector: () => {
          setMode({ id: ModeGame.DEFAULT });
        },
        showVoting: (cancelStatusId, against) => {
          setMode({
            id: ModeGame.CANCEL_VOTE,
            payload: { cancelStatusId, against },
          });
        },
      },
      viralspiral: {
        selectPlayers: () => {
          setMode({ id: ModeGame.VIRALSPIRAL_PLAYER_SELECTOR });
        },
      },
      notification: {
        add: (message) => {
          const { gameMessage, setGameMessage } = this.gameMessage;
          setGameMessage([message, ...gameMessage.slice(0, 50)]);
          setTimeout(() => {
            setGameMessage([]);
          }, 1500);
        },
        reset: () => {
          const { gameMessage, setGameMessage } = this.gameMessage;
          setGameMessage([]);
        },
      },
      reset: () => {
        const { gameStat, setGameStat } = this.state;
        const { room, setRoom } = this.room;
        const { mode, setMode } = this.mode;

        setGameStat(GameStatDefault);
        setRoom(RoomDefault);
        setMode(ModeGameDefault);
      },
    };
  }
}

const server = new Server(import.meta.env.MODE);
const client = new Client(server);
const GameManagerInstance = new GameManager(client);

export default GameManagerInstance;
