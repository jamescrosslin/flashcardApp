const express = require("express")
const router = express.Router()

const {
  data,
  data: { cards }
} = require("../data/flashcardData.json")

router.get("/:id", (req, res) => {
  const side = req.query.side ?? "question"
  const { id } = req.params

  res.locals = {
    id,
    side,
    text: cards[id][side],
    hint: cards[id].hint
  }
  res.render(`card`)
})

router.get("/", (req, res) => {
  const id = Math.floor(Math.random() * cards.length)
  res.redirect(302, `/cards/${id}`)
})

module.exports = router
