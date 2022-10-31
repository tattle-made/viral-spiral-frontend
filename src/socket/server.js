const ServerLocalConfig = {
  protocol: "http",
  host: "localhost",
  port: 5000,
  url: "http://localhost:5000",
};

const ServerProdConfig = {
  PROTOCOL: "https://",
  HOST: "viral-spiral-server.tattle.co.in",
  port: 443,
  url: `https://viral-spiral-server.tattle.co.in`,
};

class Server {
  constructor(env) {
    const environ = env;
    this.config =
      environ === "development"
        ? ServerLocalConfig
        : environ === "production"
        ? ServerProdConfig
        : ServerLocalConfig;
  }
}

export default Server;
