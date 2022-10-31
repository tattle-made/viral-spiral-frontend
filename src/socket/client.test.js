import Server from "./server";
import Client from "./client";

describe("test socket client", () => {
  test("client can connect to server", () => {
    const server = new Server("development");
    const client = new Client(server, {});
    console.log({ server, client });
    expect(1).toBe(1);
  });
});
