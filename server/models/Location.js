import pg from "pg"
import fs from "fs"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/monolith_adventures_development",
})

class Location{
  constructor({id, location}) {
    this.id = id
    this.location=location
  }

  static async findAll() {
    try {
      const client = await pool.connect()
      const result = await client.query("SELECT * FROM adventures;")
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






  async adventures() {
    const adventureFile = await import("./Adventure.js")
    const Adventure = adventureFile.default

    try {
      const client = await pool.connect()
      const query = `SELECT * FROM adventures WHERE location_id = ${this.id};`
      const result = await client.query(query)

      //get the results
      const relatedAdventuresData = result.rows
      const relatedAdventures = relatedAdventuresData.map(adventure => new Adventure(adventure))

      //release the connection back to the pool
      client.release()

      return relatedAdventures
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }
}

export default Location