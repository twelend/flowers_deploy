const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  async register(req, res) {
    const { name, surname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = await db.query(
        `INSERT INTO users (name, surname, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, surname || null, email, hashedPassword]
      );
      res.json(newUser.rows[0]);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ error: "Email already exists" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
        email,
      ]);
      if (user.rows.length === 0) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
      const token = jwt.sign(
        { userId: user.rows[0].id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateProfile(req, res) {
    const userId = req.user.userId;
    const { name, surname, password } = req.body;
    
    try {
      let updateFields = [];
      let queryParams = [];
      let paramCounter = 1;

      if (name !== undefined) {
        updateFields.push(`name = $${paramCounter}`);
        queryParams.push(name);
        paramCounter++;
      }

      if (surname !== undefined) {
        updateFields.push(`surname = $${paramCounter}`);
        queryParams.push(surname);
        paramCounter++;
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.push(`password = $${paramCounter}`);
        queryParams.push(hashedPassword);
        paramCounter++;
      }

      if (updateFields.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      queryParams.push(userId);
      const query = `
        UPDATE users 
        SET ${updateFields.join(', ')} 
        WHERE id = $${paramCounter} 
        RETURNING id, name, surname, email
      `;

      const updatedUser = await db.query(query, queryParams);

      if (updatedUser.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(updatedUser.rows[0]);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getProfile(req, res) {
    const userId = req.user.userId;
    try {
      const user = await db.query(
        `SELECT id, name, surname, email FROM users WHERE id = $1`,
        [userId]
      );
      
      if (user.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const favoriteFlowers = await db.query(
        `SELECT f.* FROM flower f 
         JOIN user_favorite_flowers uff ON f.id = uff.flower_id 
         WHERE uff.user_id = $1`,
        [userId]
      );

      res.json({ ...user.rows[0], favoriteFlowers: favoriteFlowers.rows });
    } catch (error) {
      console.error("Error getting profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async removeFavoriteFlower(req, res) {
    const userId = req.user.userId;
    const { flowerId } = req.params;
    
    console.log('Removing favorite flower:', { userId, flowerId });
    
    try {
      const result = await db.query(
        `DELETE FROM user_favorite_flowers WHERE user_id = $1 AND flower_id = $2`,
        [userId, flowerId]
      );
      console.log('Delete result:', result);
      
      res.json({ message: "Flower removed from favorites" });
    } catch (error) {
      console.error("Error removing favorite flower:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async addFavoriteFlower(req, res) {
    const userId = req.user.userId;
    const { flowerId } = req.body;
    
    try {
      // Проверяем, существует ли уже такая запись
      const existingFavorite = await db.query(
        `SELECT * FROM user_favorite_flowers WHERE user_id = $1 AND flower_id = $2`,
        [userId, flowerId]
      );

      if (existingFavorite.rows.length > 0) {
        return res.status(400).json({ error: "Цветок уже в избранном" });
      }

      // Добавляем цветок в избранное
      await db.query(
        `INSERT INTO user_favorite_flowers (user_id, flower_id) VALUES ($1, $2)`,
        [userId, flowerId]
      );

      res.json({ message: "Цветок успешно добавлен в избранное" });
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new UserController();
