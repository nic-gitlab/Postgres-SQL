import express from "express"
import Location from '../../../models/Location.js'


const locationsRouter = new express.Router()

genresRouter.get("/", async (req, res) => {
  try {
    const locations = await Location.findAll()
    res.status(200).json({ locations: locations })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})




locationsRouter.get("/:id", async (req, res) => {
  try {
    const location = await Location.findById(req.params.id)
    genre.movies = await location.adventures()
    res.status(200).json({ location: location })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})