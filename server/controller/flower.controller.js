const db = require("../db");

class FlowerController {
  async createFlower(req, res) {
    const {
      name,
      type,
      characteristics,
      country,
      season,
      sort_provider,
      room_type,
      img,
    } = req.body;
    try {
      const newFlower = await db.query(
        `INSERT INTO flower (name, type, characteristics, country, season, sort_provider, room_type, img) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
          name,
          type,
          characteristics,
          country,
          season,
          sort_provider,
          room_type,
          img,
        ]
      );
      res.json(newFlower.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getFlowers(req, res) {
    try {
      const flowers = await db.query(`
        SELECT 
          f.*,
          c.name as country_name,
          t.name as type_name,
          rt.name as room_type_name
        FROM flower f
        LEFT JOIN country c ON f.country_id = c.id
        LEFT JOIN type t ON f.type_id = t.id
        LEFT JOIN room_type rt ON f.room_type_id = rt.id
        ORDER BY f.id
      `);
      res.json(flowers.rows);
    } catch (error) {
      console.error("Error getting flowers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getFlowersByCountry(req, res) {
    const countryId = req.query.countryId;
    try {
      const flowers = await db.query(`
        SELECT 
          f.*,
          c.name as country_name,
          t.name as type_name,
          rt.name as room_type_name
        FROM flower f
        LEFT JOIN country c ON f.country_id = c.id
        LEFT JOIN type t ON f.type_id = t.id
        LEFT JOIN room_type rt ON f.room_type_id = rt.id
        WHERE f.country_id = $1
        ORDER BY f.id
      `, [countryId]);
      res.json(flowers.rows);
    } catch (error) {
      console.error("Error getting flowers by country:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getFlowersByType(req, res) {
    const typeId = req.query.typeId;
    try {
      const flowers = await db.query(`
        SELECT 
          f.*,
          c.name as country_name,
          t.name as type_name,
          rt.name as room_type_name
        FROM flower f
        LEFT JOIN country c ON f.country_id = c.id
        LEFT JOIN type t ON f.type_id = t.id
        LEFT JOIN room_type rt ON f.room_type_id = rt.id
        WHERE f.type_id = $1
        ORDER BY f.id
      `, [typeId]);
      res.json(flowers.rows);
    } catch (error) {
      console.error("Error getting flowers by type:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getFlowersByRoomType(req, res) {
    const roomTypeId = req.query.roomTypeId;
    try {
      const flowers = await db.query(`
        SELECT 
          f.*,
          c.name as country_name,
          t.name as type_name,
          rt.name as room_type_name
        FROM flower f
        LEFT JOIN country c ON f.country_id = c.id
        LEFT JOIN type t ON f.type_id = t.id
        LEFT JOIN room_type rt ON f.room_type_id = rt.id
        WHERE f.room_type_id = $1
        ORDER BY f.id
      `, [roomTypeId]);
      res.json(flowers.rows);
    } catch (error) {
      console.error("Error getting flowers by room type:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new FlowerController();
