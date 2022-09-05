const { io } = require("socket.io-client");
var _ = require("underscore");

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// function message(player, socket, eventName, eventPayload) {
//   socket.on("text_response", (arg) => {
//     resolve(arg);
//   });

//   return new Promise((resolve, reject) => {

//   });
// }

describe("test socket e2e", () => {
  const GAME_NAME = `tatle_${Math.floor(Math.random() * 999099)}`;
  const GAME_PASSWORD = `${GAME_NAME}_pw`;
  let players = [
    {
      name: "adhiraj",
      socket: undefined,
      status: "idle",
      role: "owner_and_player",
    },
    { name: "aman", socket: undefined, status: "idle", role: "player" },
    { name: "krys", socket: undefined, status: "idle", role: "player" },
    { name: "farah", socket: undefined, status: "idle", role: "player" },
  ];
  let connectionCount = 0;
  let createCount = 0;
  let joinCount = 0;
  let allMessages = [];
  let currentCard;
  let currentPlayer;
  let gameState = [];

  beforeAll((done) => {
    for (const player of players) {
      player.socket = io("http://localhost:5000/");
      player.socket.on("connect", () => {
        connectionCount++;
        if (connectionCount == players.length) {
          done();
        }
      });
    }
  });

  afterAll((done) => {
    for (const player of players) {
      player.socket.close();
    }
    done();
  });

  test("mainPlayer creates the game", async (done) => {
    for (const player of players) {
      player.socket.on("text_response", (arg) => {
        // console.log({ [`${player.name}Arg`]: arg });
        // let handleTextResponse = dispatch(
        //   is("heartbeat", handleHeartBeat, arg),
        //   is("create_game", handleCreateGame, arg),
        //   is("joined_game", handleJoinGame, arg)
        // );

        // handleTextResponse();

        if (arg && arg.data && arg.data === "heartbeat") {
        } else {
          console.log({ [`${player.name}Arg`]: arg });

          if (
            player.role === "owner_and_player" &&
            arg &&
            arg.data &&
            arg.data.includes("Created game")
          ) {
            createCount++;
            allMessages.push(`${player.name} created a game`);
          }
          if (
            player.role === "owner_and_player" &&
            arg &&
            arg.data &&
            arg.data.includes("Finished a round")
          ) {
            console.log(allMessages);
          }
          if (arg && arg.data && arg.data.includes("Joined game")) {
            joinCount++;
            allMessages.push(`${player.name} has joined the game`);
          }
        }
      });

      player.socket.on("play_card", async (arg) => {
        console.log({ [`${player.name}_play_card`]: arg.data });
        if (
          currentPlayer === player.name &&
          currentCard === arg.data.card_instance
        ) {
        } else {
          player.status = "current";
          currentCard = arg.data.card_instance;
          currentPlayer = player.name;

          // console.log({ currentCard });
          const recipients = arg.data.recipients;
          let sendTo;
          if (recipients.length !== 0) {
            sendTo = recipients[Math.floor(Math.random() * recipients.length)];
          }
          if (sendTo) {
            // send to someone
            player.socket.emit("player_action", {
              game: GAME_NAME,
              player: player.name,
              action: "action_pass_card",
              kwargs: {
                to: sendTo,
                card_instance_id: currentCard.id_,
              },
            });
            allMessages.push(
              `${player.name} has passed card ${currentCard.id_} to ${sendTo}`
            );
          } else {
            // keep it
            player.socket.emit("player_action", {
              game: GAME_NAME,
              player: player.name,
              action: "action_keep_card",
              kwargs: {
                card_instance_id: currentCard.id_,
              },
            });
            allMessages.push(
              `${player.name} has kept card ${currentCard.card.id_}`
            );
          }
          await sleep(4000);
        }
      });

      // player.socket.on("whos_turn", (arg) => {
      //   console.log({ [`${player.name}_whos_turn`]: arg });
      // });

      player.socket.on("endgame", (arg) => {
        console.log({ [`${player.name}_endgame`]: arg });
        if (player.role === "owner_and_player") {
          console.log(allMessages);
        }
      });
    }

    players[0].socket.emit("create_game", {
      game: GAME_NAME,
      password: GAME_PASSWORD,
      players: ["adhiraj", "aman", "krys", "farah"],
      topics_filepath: "config_jsons/example1/topics.json",
      colors_filepath: "config_jsons/example1/colors.json",
      draw_fn_name: "first",
      cards_filepath: "config_jsons/example1/cards.json",
    });

    await sleep(1000);

    // all 4 players must join the game
    for (const player of players) {
      player.socket.emit("join_game", {
        game: GAME_NAME,
        player: player.name,
      });
    }

    await sleep(2000);

    expect(connectionCount).toBe(4);
    expect(createCount).toBe(1);
    expect(joinCount).toBe(4);
    // expect(players.filter((player) => player.status === "current").length).toBe(
    //   1
    // );

    // await sleep(7000);
    // console.log(allMessages);
    // done();
  });
});
