/**
 * Setup a mock server to test all super powers
 */

import { app, io, httpServer, sleep } from "./server-core.js";
import { payloads } from "./base-game-payload.js";

app.get("/", (req, res) => {
  res.json({ msg: "ok" });
});

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
    setInterval(() => {
      socket.emit("play_card", payloads.oPlayCard);
      socket.emit("vote_cancel");
    }, 1000);
  });

  socket.on("about_game", (arg, callback) => {
    console.log("about polled");
    callback(payloads.oAboutGame);
  });
});

httpServer.listen(5000, () => {
  console.log("Listening on 5000");
});
