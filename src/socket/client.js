import { io } from "socket.io-client";
import { reject } from "underscore";

class Client {
  constructor(server, handlers = {}) {
    this.server = server;
    this.handlers = handlers;
    this.socket = undefined;
  }

  connect() {
    // debugger;
    this.socket = io(this.server.config.url);
    // this.socket.on("connect", () => {
    //   console.log(`connected : ${this.socket.id}`);
    // });
    // this.socket.on("connect_error", () => {
    //   console.log(`error`);
    // });
    // this.socket.on("disconnect", (reason) => {
    //   console.log(`disconnect : ${reason}`);
    // });
    // this.socket.on("text_response", (arg) => {
    //   console.log(arg);
    // });
    // todo : connect handlers
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
      // console.log(name + "SENT");
      // console.log(name);
      // console.log(this.socket);
      this.socket.emit(name, payload, (arg) => {
        if (arg.status === 200) {
          // console.log(name + "RECEIVED");
          // console.log(arg);
          resolve(arg);
        } else {
          // console.log(name + "FAILED");
          // console.log(arg);
          reject(arg.message);
        }
      });
    });
  }
}

export default Client;
