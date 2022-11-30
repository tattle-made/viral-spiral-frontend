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

const aboutGame = [
  {
    total_global_bias: 10,
    current_drawing_player: {
      id_: "player1",
      name: "adhiraj",
      available_powers: [],
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
        },
      },
      {
        id_: "player2",
        name: "aman",
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
        },
      },
      {
        id_: "player3",
        name: "krys",
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
        },
      },
      {
        id_: "player4",
        name: "farah",
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
  socket.on("create_game", (arg, callback) => {
    console.log(arg);
    console.log(callback);
    callback({
      status: 200,
      data: "Created game",
    });
  });
  socket.on("join_game", (arg, callback) => {
    console.log(arg);
    callback({
      status: 200,
      data: "Joined Game",
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

  socket.on("player_action", (arg, callback) => {
    if (arg.action === "encyclopedia_search") {
      callback({
        status: 200,
        results: [
          {
            id: "asdf",
            headline: "Lorem ipsum dolor sit amet",
            text: "Ac odio tempor orci dapibus ultrices in iaculis. Ut morbi tincidunt augue interdum velit.",
          },
          {
            id: "asdf",
            headline: "Nunc sed id semper risus",
            text: "Faucibus a pellentesque sit amet porttitor eget. At tempor commodo ullamcorper a lacus vestibulum sed. ",
          },
          {
            id: "asdf",
            headline: "Lorem ipsum dolor ",
            text: "Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt.",
          },
          {
            id: "asdf",
            headline: "Varius vel pharetra vel",
            text: "Sagittis eu volutpat odio facilisis mauris sit amet massa vitae. ",
          },
        ],
      });
    } else if (arg.action === "fake_news") {
      callback({
        status: 200,
        card: {
          fake_headline: "Sagittis eu volutpat odio facilisis mauris",
        },
      });
    }
  });
});

httpServer.listen(5000, () => {
  console.log("Listening");
});
