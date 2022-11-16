const ServerLocalConfig = {
  protocol: "http",
  host: "localhost",
  port: 5000,
  url: "http://api.viralspiral.net",
};

const ServerProdConfig = {
  PROTOCOL: "https://",
  HOST: "api.viralspiral.net",
  port: 443,
  url: `https://api.viralspiral.net`,
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
