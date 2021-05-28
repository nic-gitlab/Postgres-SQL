import pg from "pg"
import fs from "fs"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/monolith_adventures_development",
})

class Adventure {
  constructor({ id = null, title, locationId, location_id }) {
    this.id = id
    this.title = title
    this.locationId = locationId || location_id
  }

  static async findAll() {
    try {
      const client = await pool.connect()
      const result = await client.query("SELECT * FROM pet;")
      const adventuresData = result.rows

      const adventures = adventuresData.map((adventure) => {
        return new this(adventure)
      })

      client.release()
      return adventures
    } catch (error) {
      console.log(error)
      pool.end()
    }
  }

  static async findById(id) {
    try {
      const client = await pool.connect()
      const result = await client.query("SELECT * FROM adventures WHERE id = $1;", [id])

      const adventureData = result.rows[0]

      const adventure = new this(adventureData)
      client.release()
      return adventure
    } catch (error) {
      console.log(error)
      pool.end()
    }
  }

  async save() {
    try {
      const client = await pool.connect()
      const queryString = "INSERT INTO adventures (title, location) VALUES ($1, $2) RETURNING id"
      const values = [this.title, this.location]
      const result = await client.query(queryString, values)
      const adventureId = result.rows[0].id
      this.id = adventureId
      client.release()
      return true
    } catch (error) {
      console.log(error)
      pool.end()
      return false
    }
  }

  async location() {
    const locationFile = await import("./Location.js")
    const Location = locationFile.default

    try {
      const client = await pool.connect()
      const query = `SELECT * FROM locations WHERE ID = ${this.locationId};`
      const result = await client.query(query)

      //get the results
      const relatedLocationData = result.rows[0]
      const relatedLocation = new Location(relatedLocationData)

      //release the connection back to the pool
      client.release()

      return relatedLocation
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }
}

export default Adventure
