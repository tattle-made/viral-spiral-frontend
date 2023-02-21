/**
 *
 * 1. Create a game
 * 2. Have 4 players join the game
 * 3. Each of the 4 players listens for the play_card event and randomly keeps / passes the card.
 * Additionally :
 *  1. General socket level profiling - How much time does an ack to an outgoing socket message take?
 *  2. Log the timestamp of every incoming message somewhere
 * This log can then be tabulated and analysed to figure out if for example,
 * play card events are appearing later than ideal.
 *
 * Note : Log any non 200 status codes
 */

import { Client, Server, Handlers, Messages } from "../src/socket";
import adapt from "../src/socket/adapter-recoil";
import { sleep, timed } from "./utils";
import { createWriteStream } from "fs";

const GAME_COUNT = 5;

(async function main() {
  outputFileStream = createWriteStream("out.txt");

  Array.from({ length: GAME_COUNT }, (e, ix) => ix).map(async (id) => {
    const server = new Server("production");
    let players = { adhiraj: {}, aman: {}, krys: {}, farah: {} };
    let roomName;

    for (const player in players) {
      players[player].client = new Client(server);
      players[player].playedCards = [];

      await sleep(Math.random() * 20000);
      players[player].client.connect();

      players[player].client.addHandler("connected", async function* (msg) {
        makePayload(id, "incoming", 500, "connected", msg);
      });
      players[player].client.addHandler("disconnected", async function* (msg) {
        makePayload(id, "incoming", 500, "disconnected", msg);
      });
      players[player].client.addHandler("error", async function* (msg) {
        makePayload(id, "incoming", 500, "error", msg);
      });

      players[player].client.addHandler("play_card", async (msg) => {
        const card = adapt("play_card", msg);
        const { recipients, allowedActions, cardInstanceId: cardId } = card;
        const allowedActionsOfInterest = allowedActions.filter((action) =>
          ["keep_card", "pass_card", "discard_card"].includes(action)
        );
        const choice = Math.floor(
          Math.random() * allowedActionsOfInterest.length
        );
        const scheduledAction = allowedActionsOfInterest[choice];

        if (!players[player].playedCards.includes(cardId)) {
          players[player].playedCards.push(cardId);

          // log incoming play_card message
          outputFileStream.write(
            makePayload(id, "incoming", 200, "play_card", {})
          );

          console.log("card received by ", player);
          console.log("scheduled action : ", scheduledAction);
          let message;
          switch (scheduledAction) {
            case "keep_card":
              message = Messages.make.actionKeepCard({
                game: roomName,
                sender: player,
                cardId,
              });
              break;
            case "pass_card":
              const receiver =
                recipients[Math.floor(Math.random() * recipients.length)];
              message = Messages.make.actionPassCard({
                game: roomName,
                sender: player,
                receiver,
                cardId,
              });
              break;
            case "discard_card":
              message = Messages.make.actionDiscardCard({
                game: roomName,
                sender: player,
                cardId,
              });
              break;
            default:
              break;
          }
          (async () => {
            try {
              let tsPA = performance.now();
              console.log(message);
              await players[player].client.messageWithAck(message);
              let dPA = performance.now() - tsPA;
              outputFileStream.write(
                makePayload(
                  id,
                  "incoming",
                  200,
                  message.payload.action,
                  message,
                  dPA
                )
              );
            } catch (err) {
              console.log(err);
              let dPA = performance.now() - tsPA;
              outputFileStream.write(
                makePayload(
                  id,
                  "incoming",
                  500,
                  message.payload.action,
                  {},
                  dPA
                )
              );
            }
          })();
        }
      });

      players[player].client.addHandler("endgame", async function* (msg) {
        makePayload(id, "incoming", 500, "endgame", msg);
      });
      players[player].client.enableHandlers();
    }

    // function makePayload(id, type, status, event, payload) {
    //   return `${id}, ${type}, ${status}, ${event}, ${new Date().toUTCString()} \n`;
    // }
    function makePayload(id, type, status, event, payload, ms) {
      return `${id}, ${type}, ${status}, ${event}, ${ms} \n`;
    }

    try {
      let tsCR = performance.now();
      const msgCreateRoom = Messages.make.createGame(4, "asdf");
      const { game: room } = await players.adhiraj.client.messageWithAck(
        msgCreateRoom
      );
      let dCR = performance.now() - tsCR;

      roomName = room.name;
      outputFileStream.write(
        makePayload(id, "incoming", 200, "create_room", { room }, dCR)
      );

      for (const player in players) {
        // console.log(room.name);
        const msgJoinRoom = Messages.make.joinGame(room.name, player);

        let tsJR = performance.now();
        try {
          const { about } = await players[player].client.messageWithAck(
            msgJoinRoom
          );
          let dJR = performance.now() - tsJR;
          outputFileStream.write(
            makePayload(id, "incoming", 200, "join_room", about, dJR)
          );
        } catch (err) {
          let dJR = performance.now() - tsJR;
          outputFileStream.write(
            makePayload(id, "incoming", 500, "join_room", about, dJR)
          );
        }
      }
    } catch (err) {
      console.log(err);
      outputFileStream.write(
        makePayload(id, "incoming", 500, "create_room", {})
      );
    }
  });
})();
