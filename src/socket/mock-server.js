import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.options("*", cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.json({ msg: "ok" });
});

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const aboutGame = [
  {
    total_global_bias: 10,
    current_drawing_player: {
      id_: "player1",
      name: "adhiraj",
    },
    colors: [
      {
        id_: "color1",
        name: "red",
      },
      {
        id_: "color2",
        name: "yellow",
      },
      {
        id_: "color3",
        name: "blue",
      },
    ],
    topics: [
      {
        id_: "affin1",
        name: "cat",
      },
      {
        id_: "affin2",
        name: "skub",
      },
      {
        id_: "affin3",
        name: "socks",
      },
      {
        id_: "affin4",
        name: "water",
      },
      {
        id_: "affin5",
        name: "doors",
      },
    ],
    players: [
      {
        id_: "player1",
        name: "adhiraj",
        score: 10,
        color: {
          name: "red",
        },
        biases: {
          color1: 10,
          color2: 2,
          color3: 0,
        },
        affinities: {
          affin1: 0,
          affin2: 2,
          affin3: 3,
          affin4: 2,
          affin5: 9,
        },
      },
      {
        id_: "player2",
        name: "aman",
        score: 10,
        color: {
          name: "yellow",
        },
        biases: {
          color1: 10,
          color2: 2,
          color3: 0,
        },
        affinities: {
          affin1: 0,
          affin2: 2,
          affin3: 3,
          affin4: 0,
          affin5: 2,
        },
      },
      {
        id_: "player3",
        name: "krys",
        score: 10,
        color: {
          name: "yellow",
        },
        biases: {
          color1: 10,
          color2: 2,
          color3: 0,
        },
        affinities: {
          affin1: 0,
          affin2: 2,
          affin3: 3,
          affin4: 4,
          affin5: 5,
        },
      },
      {
        id_: "player4",
        name: "farah",
        score: 10,
        color: {
          name: "blue",
        },
        biases: {
          color1: 10,
          color2: 2,
          color3: 0,
        },
        affinities: {
          affin1: 0,
          affin2: 2,
          affin3: 3,
          affin4: 0,
          affin5: 2,
        },
      },
    ],
  },
];

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("message", (arg) => {
    console.log(arg);
  });
  socket.on("create_game", async (arg, callback) => {
    console.log(arg);
    console.log(callback);
    await sleep(550);
    callback({
      status: 200,
      data: "Created game",
    });
  });
  socket.on("join_game", async (arg, callback) => {
    console.log(arg);
    await sleep(550);
    callback({
      status: 200,
      about: aboutGame[0],
    });

    setInterval(() => {
      socket.emit("play_card", {
        data: {
          recipients: ["adhiraj", "krys", "aman"],
          card_instance: {
            id_: "4d7105dafc564ce69418c599b5cc718b",
            card: {
              title: "",
              description:
                "Smug cat looks on while robbers tie up family steal cash",
            },
          },
          allowed_actions: [
            "keep_card",
            "discard_card",
            "mark_as_fake",
            "encyclopedia_search",
            "pass_card",
            "viral_spiral",
            "initiate_cancel",
            "vote_cancel",
            "fake_news",
          ],
        },
      });
    }, 1000);
  });

  socket.on("about_game", (arg, callback) => {
    console.log("about polled");
    callback({
      status: 200,
      about: aboutGame[0],
    });
  });

  socket.on("player_action", async (arg, callback) => {
    await sleep(250);
    if (arg.action === "fake_news") {
      callback({
        status: 200,
        card: {
          fake_headline: "Sagittis eu volutpat odio facilisis mauris",
        },
      });
    } else if (arg.action === "mark_as_fake") {
      callback({
        status: 200,
        card: {
          foo: "bar",
        },
      });
    } else if (arg.action === "encyclopedia_search") {
      callback({
        status: 200,
        results: [
          {
            id: "asdf",
            headline: "Lorem ipsum dolor sit amet",
            content:
              "Ac odio tempor orci dapibus ultrices in iaculis. Ut morbi tincidunt augue interdum velit.",
            is_fake: undefined,
            content_lower: undefined,
          },
          {
            id: "asdf",
            headline: "Nunc sed id semper risus",
            content:
              "Faucibus a pellentesque sit amet porttitor eget. At tempor commodo ullamcorper a lacus vestibulum sed. ",
            is_fake: undefined,
            content_lower: undefined,
          },
          {
            id: "asdf",
            headline: "Lorem ipsum dolor ",
            content:
              "Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt.",
            is_fake: undefined,
            content_lower: undefined,
          },
          {
            id: "asdf",
            headline: "Varius vel pharetra vel",
            content:
              "Sagittis eu volutpat odio facilisis mauris sit amet massa vitae. ",
            is_fake: undefined,
            content_lower: undefined,
          },
        ],
      });
    } else if (arg.action === "initiate_cancel") {
      callback({
        status: 200,
        foo: bar,
      });
    } else if (arg.action === "vote_cancel") {
      callback({
        status: 200,
        foo: bar,
      });
    } else if (arg.action === "viral_spiral") {
      callback({
        status: 200,
        foo: bar,
      });
    }
  });
});

httpServer.listen(5000, () => {
  console.log("Listening");
});
