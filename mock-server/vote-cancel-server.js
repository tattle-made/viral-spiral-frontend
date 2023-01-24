/**
 * Setup a mock server to test all super powers
 */
import { app, io, httpServer, sleep } from "./server-core.js";
import { payloads } from "./vote-cancel-payload.js";

app.get("/", (req, res) => {
  res.json({ msg: "ok" });
});

let pollId;

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("message", (arg) => {
    console.log(arg);
  });
  socket.on("create_game", async (arg, callback) => {
    console.log(arg);
    console.log(callback);
    await sleep(550);
    callback(payloads.oCreateGame);
  });
  socket.on("join_game", async (arg, callback) => {
    console.log(arg);
    await sleep(550);
    callback(payloads.oJoinGame);
    pollId = setInterval(() => {
      socket.emit("vote_cancel", payloads.oVoteCancel);
    }, 1000);
  });

  socket.on("about_game", (arg, callback) => {
    console.log("about polled");
    callback(payloads.oAboutGame);
  });

  socket.on("player_action", (arg, callback) => {
    console.log(arg);
    clearInterval(pollId);
    callback({
      status: 200,
      message: "ok",
    });
  });
});

httpServer.listen(5001, () => {
  console.log("Listening");
  console.log(httpServer);
});
