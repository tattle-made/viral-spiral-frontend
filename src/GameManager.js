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
} from "./state";
import adapt from "./socket/adapter-recoil";
import _, { isEqual } from "underscore";
import { useNotification } from "./state/notification";
import { ModeGame, StateGameMode } from "./state/mode";

class GameManager {
  constructor(client) {
    this.client = client;
    this.label = "Game Manager";
    this.state = {};
    this.room = {};
    this.played_cards = [];
    this.pollID = undefined; // we keep this handy to stop the polling when the room is inactive9
  }

  test() {
    this.gameState().notification.add("hello");
  }

  setup() {
    try {
      this.client.connect();
      console.log(this);
      console.log(this.gameState());

      client.addHandler(
        "connect",
        (() => {
          return (msg) => {
            console.debug("connected", msg);
            this.addMessage(`🔌 connected`);
            if (this.room.room === undefined) {
              this.joinGame({
                room: this.room.room.name,
                username: this.room.room.me,
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
      client.addHandler("endgame", Handlers.endGame(this.gameState()));
      client.addHandler("vote_cancel", Handlers.voteCancel(this.gameState()));

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

  async createRoom({ game, players, me, password }) {
    console.log("create room called");
    this.notification.add("Creating Room");
    try {
      let allPlayers = `${players},${me}`;
      const message = Messages.make.createGame(game, password, allPlayers);
      console.log(message);
      await this.client.messageWithAck(message);
      this.room.setRoom({
        id: "abc-def",
        name: game,
        password,
        me,
        state: undefined,
      });
      this.notification.reset();
      return 1;
    } catch (err) {
      this.notification.add("Error Creating Room");
      setTimeout(() => {
        this.notification.reset();
      }, 1500);
      return undefined;
    }
  }

  async joinGame({ room, username }) {
    console.log("join room called");
    this.notification.add("loading");
    try {
      const message = Messages.make.joinGame(room, username);

      // console.log(message);
      const { about } = await this.client.messageWithAck(message);
      // console.log(about);
      const { players, current, totalGlobalBias, affinities } = adapt(
        "about_game",
        about
      );

      this.room.setRoom({
        id: "abc-def",
        name: room,
        password: "",
        me: username,
        state: undefined,
        players,
        current,
        totalGlobalBias,
        affinities,
      });
      this.notification.reset();
    } catch (err) {
      this.notification.add("Error joining Room");
      setTimeout(() => {
        this.notification.reset();
      }, 1500);
    }
  }

  pollRoom({ room }) {
    this.pollID = setInterval(async () => {
      if (window.aboutOngoing) {
        return;
      }
      const { name, payload } = Messages.make.aboutGame(room);
      window.aboutOngoing = true;
      const { about } = await client.messageWithAck(name, payload);
      window.aboutOngoing = false;
      const { players, current, totalGlobalBias, affinities } = adapt(
        "about_game",
        about
      );
      // console.log({ players, current, totalGlobalBias });
      // console.log(about);
      if (
        !_.isEqual(this.room.room.players, players) &&
        !_.isEqual(this.room.room.current, current) &&
        totalGlobalBias != this.room.room.totalGlobalBias
      ) {
        this.room.setRoom({
          ...this.room.room,
          players,
          current,
          totalGlobalBias,
          affinities,
        });
        this.addMessage(`🎴 its ${current.name}'s turn now`);
      }
    }, 2000);
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
          break;
        case "initiate_cancel":
          var message = Messages.make.actionInitiateCancelPlayer(actionPayload);
          var { foo } = await this.client.messageWithAck(message);
          this.gameState().cancelVote.showAffinitySelector();
          break;
        case "vote_cancel":
          var message = Messages.make.actionVoteToCancel(actionPayload);
          await this.client.messageWithAck(message);
          break;
        case "viral_spiral_initiate":
          // var message = Messages.make.actionViralSpiral(actionPayload);
          // await this.client.messageWithAck(message);
          this.gameState().viralspiral.selectPlayers();
          break;
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
   * This should map to the domain language used by everyone
   * in the team
   * @returns
   */
  gameState() {
    const { gameStat, setGameStat } = this.state;
    const { setMode } = this.mode;

    return {
      encyclopaedia: {
        show: (message) => {
          const { title, content } = message;
          setMode({
            id: ModeGame.ENCYCLOPEDIA_SEARCH_RESULT,
            payload: { title, content },
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
        },
      },
      reset: () => {
        setGameMessage(GameStatDefault);
      },
    };
  }
}

const server = new Server(import.meta.env.MODE);
const client = new Client(server);
const GameManagerInstance = new GameManager(client);

export default GameManagerInstance;
