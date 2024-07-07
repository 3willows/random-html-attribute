const fs = require("fs")
const puppeteer = require("puppeteer")

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture"
  )

  const pageEntries = await page.evaluate(() => {
    const item = document.querySelector(
      "#content > article > section:nth-child(3) > div > ol > li:nth-child(1)")

      return item.innerHTML
    
  })

  // Save page objects to JSON on disk

  const pageJSON = JSON.stringify({ content: `${pageEntries}` })
    fs.writeFile("./data/test.json", pageJSON, function (err) {
    if (err) {
      return console.log(err)
    }
    console.log(`New pages saved! (JSON length: ${pageJSON.length})`)
  })

  await browser.close()
})()
