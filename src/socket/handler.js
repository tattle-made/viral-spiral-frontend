function connectionHandler() {
  console.log("connected");
}
function disconnectHandler() {
  console.log("disconnected");
}
function errorHandler(msg) {
  console.log("error");
  console.log(msg);
}
function textResponseMessageHandler() {
  console.log("message");
}
function endGameMessageHandler() {}
function playCardMessageHandler() {
  console.log("play card");
}

function heartBeatHandler(set, get) {
  return (msg) => {
    console.debug("heartbeat", msg);
    console.debug(get);
    set([
      {
        key: Math.floor(Math.random() * 99999),
        value: `❤️ : ${msg.count}`,
      },
      ...get.slice(0, 10),
    ]);
  };
}

export default {
  connectionHandler,
  disconnectHandler,
  errorHandler,
  textResponseMessageHandler,
  endGameMessageHandler,
  playCardMessageHandler,
  heartBeatHandler,
};
