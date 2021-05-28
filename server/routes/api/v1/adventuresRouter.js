import express from "express"
import Adventure from "../../../models/Adventure.js"

const adventuresRouter = new express.Router()

adventuresRouter.get("/", async (req, res) => {
  try {
    const adventures = await Adventure.findAll()
    res.status(200).json({ adventures: adventures })
  } catch (error) {
    console.log(error)
    res.json({ errors: error })
  }
})

adventuresRouter.get("/:id", async (req, res) => {
  try {
    const adventureId = req.params.id
    const adventure = await Adventure.findById(adventureId)
    return res.status(200).json({ adventure: adventure })
  } catch (error) {
    console.log(error)
    res.json({ errors: error })
  }
})

adventuresRouter.post("/", async (req, res) => {
  try {
    const formData = req.body
    const newAdventure = new Adventure(formData)
    await newAdventure.save()
    return res.json({ adventure: newAdventure })
  } catch (error) {
    console.log(error)
    res.json({ errors: error })
  }
})

export default adventuresRouter
