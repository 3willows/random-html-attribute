require("dotenv").config()

// init project
const express = require("express")
const app = express()
app.use(express.static("public"))
app.set("view engine", "ejs")

const pages = require("./data/pages.json")
const getRndPage = () => pages[Math.floor(Math.random() * pages.length)]

app.get("/test", (_, res) => {
  res.send("test")
})

app.get("/", (_, res) => {
  const randomPage = getRndPage()
  const { Anchor, AttributeName, Elements, Description, Title } = randomPage

  res.render(__dirname + "/views/index.ejs", {
    Anchor: `${Anchor}`,
    AttributeName: `${AttributeName}`,
    Elements: `${Elements}`,
    Description: `${Description}`,
    Title: `${Title}`
  })
})

// listen for requests :)
// need to comment out for deployment

// const listener = app.listen(process.env.PORT, function () {
//   console.log("Your app is listening on port " + listener.address().port)
// })

module.exports = app
