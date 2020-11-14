const express = require("express")
const router = express.Router()

const {
  data,
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
      id,
      side,
      text: cards[id][side],
      hint: cards[id].hint
    }
    res.render(`card`)
  } catch (err) {
    console.error(err.message)
    res.redirect("/cards")
  }
})

module.exports = router
