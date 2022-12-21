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
  const roomName = `lucky-${randomRoomNum()}`;
  // const roomName = "tabahi-1000";
  // const GAME_URL = "http://localhost:5173/";
  const GAME_URL = "https://viralspiral.net/";

  console.log({ roomName });

  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto(GAME_URL);
  await sleep(1000);
  await page.type(".new-room-game", roomName);
  await page.type(".new-room-password", "asdf");
  await page.type(".new-room-me", "adhiraj");
  await page.type(".new-room-players", "aman,farah,krys");
  await page.click(".new-room-create");
  await sleep(7000);
  // await page.click(".tab-game-stat");

  const browserB = await launchBrowser();
  const pageB = await browserB.newPage();
  await pageB.goto(GAME_URL);
  await sleep(100);
  await pageB.type(".join-room-game", roomName);
  await pageB.type(".join-room-me", "aman");
  await pageB.click(".join-room-join");
  await sleep(2000);
  // await pageB.click(".tab-game-stat");

  const browserC = await launchBrowser();
  const pageC = await browserC.newPage();
  await pageC.goto(GAME_URL);
  await sleep(100);
  await pageC.type(".join-room-game", roomName);
  await pageC.type(".join-room-me", "farah");
  await pageC.click(".join-room-join");
  await sleep(2000);
  // await pageC.click(".tab-game-stat");

  const browserD = await launchBrowser();
  const pageD = await browserD.newPage();
  await pageD.goto(GAME_URL);
  await sleep(100);
  await pageD.type(".join-room-game", roomName);
  await pageD.type(".join-room-me", "krys");
  await pageD.click(".join-room-join");
  await sleep(2000);
  // await pageD.click(".tab-game-stat");

  //   await sleep(5000);
  //   await browser.close();
})();
