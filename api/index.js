require("dotenv").config()

// init project
const express = require("express")
const app = express()
app.use(express.static("public"))
app.set("view engine", "ejs")

const pages = require("./data/pages.json")
const getRndPage = () => pages[Math.floor(Math.random() * pages.length)]

app.get("/", (req, res) =>
  res.render(__dirname + "/views/index", {
    AttributeName: `${getRndPage().AttributeName}`,
    Elements: `${getRndPage().Elements}`,
    Description: `${getRndPage().Description}`,
  })
)

// listen for requests :)

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port)
})

module.exports = app
