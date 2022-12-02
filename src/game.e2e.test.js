import puppeteer from "puppeteer";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function randomRoomNum() {
  return Math.floor(Math.random() * 999999);
}

async function launchBrowser() {
  return puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
}

(async () => {
  const roomName = `uniball-${randomRoomNum()}`;
  // const GAME_URL = "http://localhost:5173/viral-spiral-frontend/";
  const GAME_URL = "https://tattle-made.github.io/viral-spiral-frontend/";

  console.log({ roomName });

  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto(GAME_URL);
  await page.type(".new-room-game", roomName);
  await page.type(".new-room-password", "asdf");
  await page.type(".new-room-me", "adhiraj");
  await page.type(".new-room-players", "aman,farah,krys");
  await page.click(".new-room-create");
  await sleep(10000);
  await page.click(".tab-game-stat");

  const browserB = await launchBrowser();
  const pageB = await browserB.newPage();
  await pageB.goto(GAME_URL);
  await pageB.type(".join-room-game", roomName);
  await pageB.type(".join-room-me", "aman");
  await pageB.click(".join-room-join");
  await sleep(100);
  await pageB.click(".tab-game-stat");

  const browserC = await launchBrowser();
  const pageC = await browserC.newPage();
  await pageC.goto(GAME_URL);
  await pageC.type(".join-room-game", roomName);
  await pageC.type(".join-room-me", "farah");
  await pageC.click(".join-room-join");
  await sleep(100);
  await pageC.click(".tab-game-stat");

  const browserD = await launchBrowser();
  const pageD = await browserD.newPage();
  await pageD.goto(GAME_URL);
  await pageD.type(".join-room-game", roomName);
  await pageD.type(".join-room-me", "krys");
  await pageD.click(".join-room-join");
  await sleep(50);
  await pageD.click(".tab-game-stat");

  //   await sleep(5000);
  //   await browser.close();
})();
