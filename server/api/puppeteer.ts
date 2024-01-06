import puppeteer from "puppeteer";

export default defineEventHandler(async (event) => {
  let response = {
    message: null, 
    start: new Date().toTimeString(),
    end: null,
  }
  console.log("Initial browser 🌐");
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      // "--window-size=1366,1000",
    ],
    // defaultViewport: {
    //   width: 1366,
    //   height: 820,
    // },
  });
  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
    );
    page.setDefaultNavigationTimeout(60 * 1000);
    let pages = await browser.pages();
    await pages[0].close();

    await page.goto(
      `https://www.instagram.com/reel/C01xS9Egxhi/?igsh=cHAwdzRhY3Zmajhz`,
      { waitUntil: ["load", "networkidle0"] },
    );

    response.message = 'success'
  } catch (err) {
    response.message = 'error'
  } finally {
    await browser.close();

    response.end = new Date().toTimeString()
    return response;
  }
});
