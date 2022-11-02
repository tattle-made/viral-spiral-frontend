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

class GameManager {
  constructor(client) {
    this.client = client;
    this.label = "Game Manager";
    this.state = {};
    this.room = {};
    this.played_cards = [];
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
          };
        })()
      );

      client.addHandler(
        "error",
        (() => {
          return (msg) => {
            console.debug("Error", msg);
            this.addMessage(`error`);
          };
        })()
      );

      client.addHandler("disconnect", Handlers.disconnectHandler);
      client.addHandler("connect_error", Handlers.errorHandler);
      client.addHandler("text_response", Handlers.textResponseMessageHandler);
      client.addHandler("endgame", Handlers.endGameMessageHandler);
      client.addHandler(
        "play_card",
        (() => {
          return (msg) => {
            console.log("Play Card");
            // check if you were the last one to play card?
            const cardId = msg.data.card_instance.id_;
            if (this.played_cards.includes(cardId)) {
              this.addMessage(`🎴 played card received again. Ignoring`);
            } else {
              const card = {
                id: cardId,
                title: msg.data.card_instance.card.title,
                description: msg.data.card_instance.card.description,
                recipients: msg.data.recipients,
              };
              this.updateGameState({ card });
            }
          };
        })()
      );

      // todo : refactor to the handler.
      // use of the recoil getter and setter in this is causing problems
      // state doesnt update once refactored into a new file. not sure why.
      client.addHandler(
        "heartbeat",
        (() => {
          return (msg) => {
            this.addMessage(`❤️ ${msg.count}`);
          };
        })()
      );

      this.client.enableHandlers();
    } catch (err) {
      console.log("Error Setting up Client", err);
    }
  }

  teardown() {
    try {
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

    return { gameStat, room, gameConfig, gameMessage };
  }

  setListener() {
    setInterval(() => {
      this.state.setGameStat({ tgb: 2, affinity: { cat: 2, sock: 2 } });
    }, 5000);
  }

  async createRoom({ game, players, me, password }) {
    console.log("create room called");
    let allPlayers = `${players},${me}`;
    const message = Messages.make.createGame(game, password, allPlayers);
    console.log(message);
    await this.client.messageWithAck(message.name, message.payload);
    this.room.setRoom({
      id: "abc-def",
      name: game,
      password: password,
      me,
      state: undefined,
    });
  }

  async joinGame({ room, username }) {
    console.log("join room called");
    const message = Messages.make.joinGame(room, username);
    console.log(message);
    await this.client.messageWithAck(message.name, message.payload);
    this.room.setRoom({
      id: "abc-def",
      name: room,
      password: "",
      me: username,
      state: undefined,
    });
    setInterval(async () => {
      const message = Messages.make.aboutGame(room);
      const ack = await client.messageWithAck(message.name, message.payload);
      console.log("****");
      console.log(ack);
    }, 5000);
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
    switch (actionType) {
      case "action_keep_card":
        var { game, sender, cardId } = actionPayload;
        var message = Messages.make.actionKeepCard(game, sender, cardId);
        console.log({ card: message });
        return this.client.messageWithAck(message.name, message.payload);
      case "action_pass_card":
        var { game, sender, receiver, cardId } = actionPayload;
        var message = Messages.make.actionPassCard(
          game,
          sender,
          receiver,
          cardId
        );
        console.log({ message });
        return this.client.messageWithAck(message.name, message.payload);
      default:
        console.debug("Unsupported Action");
        this.addMessage(`⚠️ Unsupported Action`);
    }
  }

  addMessage(message) {
    const { gameMessage, setGameMessage } = this.gameMessage;
    setGameMessage([message, ...gameMessage.slice(0, 10)]);
  }

  updateGameState(subState) {
    const { gameStat, setGameStat } = this.state;
    console.log("----");
    console.log({ gameStat, subState });
    console.log("----");
    console.log({ ...gameStat, ...subState });
    setGameStat({ ...gameStat, ...subState });
    this.played_cards.push();
  }

  async loadGame() {}

  updateStats() {}

  isConnected() {}

  /**
   * checks the local storage to see if user needs to rejoin
   * a game they were playing previously.
   */
  shouldResume() {}

  loadGameFromLocalStorage() {}
}

const server = new Server(import.meta.env.ENVIRONMENT);
const client = new Client(server);
const GameManagerInstance = new GameManager(client);

export default GameManagerInstance;
