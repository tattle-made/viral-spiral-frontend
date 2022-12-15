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

class GameManager {
  constructor(client) {
    this.client = client;
    this.label = "Game Manager";
    this.state = {};
    this.room = {};
    this.played_cards = [];
    this.pollID = undefined; // we keep this handy to stop the polling when the room is inactive
    // this.stats = new GameStats();
  }

  setup() {
    try {
      this.client.connect();

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

      client.addHandler("error", Handlers.errorHandler());
      client.addHandler(
        "play_card",
        Handlers.playCard(this.played_cards, this.game())
      );
      client.addHandler("heartbeat", Handlers.heartBeatHandler());

      client.addHandler("disconnect", Handlers.disconnectHandler);
      client.addHandler("connect_error", Handlers.errorHandler);
      client.addHandler("text_response", Handlers.textResponseMessageHandler);
      client.addHandler("endgame", Handlers.endGame(this.game()));

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
    const { notification, add, reset } = useNotification();

    this.state = {
      gameStat,
      setGameStat,
    };

    this.room = {
      room,
      setRoom,
    };

    this.gameConfig = {
      gameConfig,
      setGameConfig,
    };

    this.gameMessage = {
      gameMessage,
      setGameMessage,
    };

    this.notification = {
      notification,
      add,
      reset,
    };

    return {
      gameStat,
      room,
      gameConfig,
      gameMessage,
      add,
    };
  }

  setListener() {
    setInterval(() => {
      this.state.setGameStat({ tgb: 2, affinity: { cat: 2, sock: 2 } });
    }, 5000);
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
        password: password,
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
      console.log(about);
      const { players, current, totalGlobalBias } = adapt("about_game", about);

      this.room.setRoom({
        id: "abc-def",
        name: room,
        password: "",
        me: username,
        state: undefined,
        players,
        current,
        totalGlobalBias,
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
      const { players, current, totalGlobalBias } = adapt("about_game", about);
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
    this.state.setGameStat(GameStatDefault);
    this.client.disconnect();
  }

  async playerAction(actionType, actionPayload) {
    console.log("player action called");

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
          this.game().encyclopaedia.show(message);
          break;
        case "fake_news":
          var message = Messages.make.actionFakeNews(actionPayload);
          var { card } = await this.client.messageWithAck(message);
          this.game().card.changeText(card.fake_headline);
          break;
        case "mark_as_fake":
          var message = Messages.make.actionMarkAsFake(actionPayload);
          var result = await this.client.messageWithAck(message);
          break;
        case "initiate_cancel":
          var message = Messages.make.actionInitiateCancelPlayer(actionPayload);
          var result = await this.client.messageWithAck(message);
          break;
        case "vote_cancel":
          var message = Messages.make.actionVoteToCancel(actionPayload);
          var result = await this.client.messageWithAck(message);
          break;
        case "viral_spiral":
          var message = Messages.make.actionViralSpiral(actionPayload);
          var results = await this.client.messageWithAck(message);
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

  addMessage(message) {
    const { gameMessage, setGameMessage } = this.gameMessage;
    setGameMessage([message, ...gameMessage.slice(0, 50)]);
  }

  game() {
    const { gameStat, setGameStat } = this.state;
    const { gameMessage, setGameMessage } = this.gameMessage;
    return {
      encyclopaedia: {
        show: (message) => {
          setGameStat({
            ...gameStat,
            mode: {
              id: "encyclopaedia_search_result",
              payload: { title: "", content: "", message },
            },
          });
        },
        hide: () => {
          setGameStat({ ...gameStat, mode: undefined });
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
      notification: {
        add: (message) => {
          setGameMessage([message, ...gameMessage.slice(0, 50)]);
        },
      },
    };
  }
}

const server = new Server(import.meta.env.MODE);
const client = new Client(server);
const GameManagerInstance = new GameManager(client);

export default GameManagerInstance;
