const fs = require("fs")
const puppeteer = require("puppeteer")

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes"
  )
  const pageEntries = await page.evaluate(() => {
    const table = document.querySelector(
      "#content > article > section:nth-child(3) > div > figure > table"
    )
    const allAnchors = table.querySelectorAll("a")

    // Create an array to store the innerHTML of each anchor
    const anchorContents = Array.from(allAnchors).map(
      (anchor) => anchor.innerHTML
    )

    return anchorContents
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
