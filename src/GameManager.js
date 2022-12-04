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
            console.log(this.room);
            if (this.room.room === undefined) {
              this.joinGame({
                room: this.room.room.name,
                username: this.room.room.me,
              });
            }
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
      client.addHandler(
        "endgame",
        (() => {
          return (msg) => {
            console.log("received end game event");
            this.addMessage(`🎴 Game has ended`);
          };
        })()
      );
      client.addHandler(
        "play_card",
        (() => {
          return (msg) => {
            // console.log("Play Card");
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
              // this.addMessage(`🎴 Play Card`);
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
            console.log("---HEARTBEAT--");
            console.log(msg);
            console.log("-----");
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
      await this.client.messageWithAck(message.name, message.payload);
      this.room.setRoom({
        id: "abc-def",
        name: game,
        password: password,
        me,
        state: undefined,
      });
      this.notification.reset();
    } catch (err) {
      this.notification.add("Error Creating Room");
      setTimeout(() => {
        this.notification.reset();
      }, 1500);
    }
  }

  async joinGame({ room, username }) {
    console.log("join room called");
    this.notification.add("loading");
    try {
      const message = Messages.make.joinGame(room, username);

      // console.log(message);
      const { about } = await this.client.messageWithAck(
        message.name,
        message.payload
      );
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
        case "action_discard_card":
          var { game, sender, cardId } = actionPayload;
          var message = Messages.make.actionDiscardCard(game, sender, cardId);
          return this.client.messageWithAck(message.name, message.payload);
        case "encyclopedia_search":
          var message = Messages.make.actionSearchEncyclopaedia(actionPayload);
          var { results } = await this.client.messageWithAck(
            message.name,
            message.payload
          );
          this.updateGameState({
            mode: { id: "encyclopaedia_search_result", payload: results },
          });
          break;
        case "fake_news":
          var message = Messages.make.actionFakeNews(actionPayload);
          var { card } = await this.client.messageWithAck(
            message.name,
            message.payload
          );
          const currentCard = this.state.gameStat.card;
          this.updateGameState({
            card: { ...currentCard, description: card.fake_headline },
          });
          break;
        case "mark_as_fake":
          var message = Messages.make.actionMarkAsFake(actionPayload);
          var { results } = await this.client.messageWithAck(
            message.name,
            message.payload
          );
          break;
        case "initiate_cancel":
          var message = Messages.make.actionInitiateCancelPlayer(actionPayload);
          var { results } = await this.client.messageWithAck(
            message.name,
            message.payload
          );
          break;
        case "vote_cancel":
          var message = Messages.make.actionVoteToCancel(actionPayload);
          var { results } = await this.client.messageWithAck(
            message.name,
            message.payload
          );
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
    // if (message === gameMessage[0]) {
    //   let count = a.match(/\d+/gi)[0];
    //   if (count === null) {
    //     setGameMessage([message, ...gameMessage.slice(0, 50)]);
    //     count = 0;
    //   }
    //   let newCount = count + 1;
    //   setGameMessage([`{message} (${newCount})`, ...gameMessage.slice(1, 50)]);
    // } else {
    // }
    setGameMessage([message, ...gameMessage.slice(0, 50)]);
  }

  updateGameState(subState) {
    const { gameStat, setGameStat } = this.state;
    setGameStat({ ...gameStat, ...subState });
    this.played_cards.push();
  }

  closeEncylopaedia() {
    this.updateGameState({ mode: undefined });
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

const server = new Server(import.meta.env.MODE);
const client = new Client(server);
const GameManagerInstance = new GameManager(client);

export default GameManagerInstance;
