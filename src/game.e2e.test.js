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

async function presetLaunchGameWith4Players() {
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
  await page.type(".new-room-you", "adhiraj");
  await page.type(".new-room-player-count", "4");
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

  // while(condition)
  // identify who has the card
  // choose from the following options [keep, pass, discard]
  // log "player X performed ${action} to ${player Y}"
  // wait for a while and repeat
}

async function presetLaunchGameWithTwoPlayers() {
  const roomName = `lucky-${randomRoomNum()}`;
  const GAME_URL = "http://localhost:5173/";

  console.log({ roomName });

  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto(GAME_URL);
  await sleep(100);
  await page.type(".new-room-game", roomName);
  await page.type(".new-room-password", "asdf");
  await page.type(".new-room-me", "adhiraj");
  await page.type(".new-room-players", "aman,farah,krys");
  await page.click(".new-room-create");
  await sleep(5000);

  const browserB = await launchBrowser();
  const pageB = await browserB.newPage();
  await pageB.goto(GAME_URL);
  await sleep(100);
  await pageB.type(".join-room-game", roomName);
  await pageB.type(".join-room-me", "aman");
  await pageB.click(".join-room-join");
  await sleep(2000);
}

async function presetLaunchGameWithOnePlayers() {
  const roomName = `lucky-${randomRoomNum()}`;
  const GAME_URL = "http://localhost:5173/";

  console.log({ roomName });

  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto(GAME_URL);
  await sleep(100);
  await page.type(".new-room-game", roomName);
  await page.type(".new-room-password", "asdf");
  await page.type(".new-room-me", "adhiraj");
  await page.type(".new-room-players", "aman,farah,krys");
  await page.click(".new-room-create");
  await sleep(5000);
}

async function presetLaunch4Browsers() {
  const GAME_URL = "http://localhost:5173/";
  // const GAME_URL = "https://viralspiral.net/";
  const browserA = await launchBrowser();
  const pageA = await browserA.newPage();
  await pageA.goto(GAME_URL);
  await pageA.evaluate(() => {
    document.querySelector(".create-room-panel").click();
  });
  await pageA.waitForSelector(".new-room-you");
  await pageA.type(".new-room-you", "adhiraj");
  await pageA.type(".new-room-player-count", "4");
  await pageA.click(".new-room-create");
  await pageA.evaluate(() => {
    document.querySelector(".new-room-create").click();
  });
  await pageA.waitForSelector(".room-name");
  const roomName = await pageA.$eval(".room-name", (el) => el.textContent);
  console.log(roomName);

  const browserB = await launchBrowser();
  const pageB = await browserB.newPage();
  await pageB.goto(`${GAME_URL}r/${roomName}`);
  await pageB.waitForSelector(".username");
  await pageB.type(".username", "aman");
  await pageB.click(".join-room-btn");
  await pageB.waitForSelector(".room-name");

  const browserC = await launchBrowser();
  const pageC = await browserC.newPage();
  await pageC.goto(`${GAME_URL}r/${roomName}`);
  await pageC.waitForSelector(".username");
  await pageC.type(".username", "farah");
  await pageC.click(".join-room-btn");
  await pageC.waitForSelector(".room-name");

  const browserD = await launchBrowser();
  const pageD = await browserD.newPage();
  await pageD.goto(`${GAME_URL}r/${roomName}`);
  await pageD.waitForSelector(".username");
  await pageD.type(".username", "krys");
  await pageD.click(".join-room-btn");
  await pageD.waitForSelector(".room-name");
}

const browser = {
  open: async (url) => {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    await page.goto(url);
  },
};

async function presetLaunchEmptyBrowsers() {
  // const GAME_URL = "https://viralspiral.net";
  const GAME_URL = "http://localhost:5173/";

  await browser.open(GAME_URL);
  await browser.open(GAME_URL);
  await browser.open(GAME_URL);
  await browser.open(GAME_URL);
}

async function presetCreateManyRooms() {
  for (var i = 0; i < 10000; i++) {
    const GAME_URL = "http://localhost:5173/";
    // const GAME_URL = "https://viralspiral.net/";
    const browserA = await launchBrowser();
    const pageA = await browserA.newPage();
    await pageA.goto(GAME_URL);
    await pageA.evaluate(() => {
      document.querySelector(".create-room-panel").click();
    });
    await pageA.waitForSelector(".new-room-you");
    await pageA.type(".new-room-you", "adhiraj");
    await pageA.type(".new-room-player-count", "4");
    await pageA.click(".new-room-create");
    await pageA.evaluate(() => {
      document.querySelector(".new-room-create").click();
    });
    await pageA.waitForSelector(".room-name");
    const roomName = await pageA.$eval(".room-name", (el) => el.textContent);
    console.log(i, roomName);
    await browserA.close();
  }
}

(async () => {
  // await presetLaunchGameWithTwoPlayers();
  // await presetLaunchGameWith4Players();
  // await presetLaunchGameWithOnePlayers();
  // await presetLaunch4Browsers();
  // await presetLaunchEmptyBrowsers();
  await presetCreateManyRooms();
})();
