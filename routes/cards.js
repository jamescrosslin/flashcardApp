const { response } = require("express")
const express = require("express")
const router = express.Router()

const {
  data: { cards }
} = require("../data/flashcardData.json")

router.get("/", (req, res) => {
  let id = Math.floor(Math.random() * cards.length)
  res.redirect(`/cards/${id}`)
})

router.get("/:id", (req, res) => {
  try {
    let { side } = req.query
    const { id } = req.params
    if (!side || side.toLowerCase() !== "answer") {
      side = "question"
    }
    res.locals = {
      name: req.cookies.username,
      id,
      side,
      text: cards[id][side],
      hint: cards[id].hint
    }
    res.render(`card`)
  } catch (err) {
    if (res.locals.secondTry) {
      return next(err)
    }
    console.error("Failed to route: " + err.message)
    res.locals.secondTry = true
    res.redirect("/cards")
  }
})

module.exports = router
