import { io } from "socket.io-client";

class Client {
  constructor(server, handlers = {}) {
    this.server = server;
    this.handlers = handlers;
    this.socket = undefined;
  }

  connect() {
    this.socket = io(this.server.config.url, { transports: ["websocket"] });
  }

  disconnect() {
    this.socket.disconnect();
  }

  addHandler(handlerName, handler) {
    this.handlers[handlerName] = handler;
  }

  enableHandlers() {
    /**
     * These help identify any connection related errors.
     */
    this.socket.on("connect", () => {
      console.log("connected", this.socket.id); // x8WIv7-mJelg7on_ALbx
    });

    this.socket.on("disconnect", () => {
      console.log("disconnected"); // undefined
    });

    this.socket.on("connect_error", (err) => {
      console.log("connect error");
      console.log(err);
    });

    Object.keys(this.handlers).map((handlerName) => {
      this.socket.on(handlerName, this.handlers[handlerName]);
      // this.socket.onAny(m => {
      //   console.log("Incoming event:")
      //   console.log(m);
      // });
    });
  }

  message(name, payload) {
    console.log(name + "SENT");
    this.socket.emit(name, payload, (arg) => {
      console.log(name + "RECEIVED");
    });
  }

  async messageWithAck({ name, payload }) {
    return new Promise((resolve, reject) => {
      // console.log({ type: "outgoing", name, payload });
      try {
        this.socket.emit(name, payload, (arg) => {
          if (arg.status === 200) {
            // console.log({ type: "incoming", arg });
            resolve(arg);
          } else {
            reject(arg.message);
          }
        });
      } catch (err) {
        console.error(err);
        reject("Error Emitting Event");
      }
    });
  }
}

export default Client;
