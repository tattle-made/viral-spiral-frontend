import { io } from "socket.io-client";
import { reject } from "underscore";

class Client {
  constructor(server, handlers = {}) {
    this.server = server;
    this.handlers = handlers;
    this.socket = undefined;
  }

  connect() {
    this.socket = io(this.server.config.url);
  }

  disconnect() {
    this.socket.disconnect();
  }

  addHandler(handlerName, handler) {
    this.handlers[handlerName] = handler;
  }

  enableHandlers() {
    Object.keys(this.handlers).map((handlerName) => {
      this.socket.on(handlerName, this.handlers[handlerName]);
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
      console.debug({ type: "outgoing", name, payload });
      try {
        this.socket.emit(name, payload, (arg) => {
          if (arg.status === 200) {
            console.debug({ type: "incoming", arg });
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
