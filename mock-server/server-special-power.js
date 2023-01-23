/**
 * Setup a mock server to test all super powers
 */

import { app, io, httpServer, sleep } from "./server-core.js";
import { payloads } from "./payloads-super-power.js";

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

  socket.on("player_action", async (arg, callback) => {
    console.log(arg);
    if (arg.action === "action_fake_news") {
      callback(payloads.oTurnIntoFakeNews);
    } else if (arg.action === "action_mark_as_fake") {
      callback(payloads.oMarkAsFake);
    } else if (arg.action === "action_encyclopedia_search") {
      callback(payloads.oEncyclopediaSearch);
    } else if (arg.action === "action_initiate_cancel") {
      console.log("ping action_initiate_cancel");
      callback(payloads.oCancelPlayerInitiate);
    } else if (arg.action === "action_vote_cancel") {
      callback(payloads.oCancelPlayerVote);
    } else if (arg.action === "action_viral_spiral") {
      callback(payloads.oViralSpiral);
    } else if (arg.action === "action_pass_card") {
      callback(payloads.oPassCard);
    }
  });
});

httpServer.listen(5001, () => {
  console.log("Listening");
});
