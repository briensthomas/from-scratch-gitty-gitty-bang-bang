const pool = require('../utils/pool');

class Post {
  id;
  created_at;
  title;
  description;

  constructor(row) {
    this.id = row.id;
    this.created_at = row.created_at;
    this.title = row.title;
    this.description = row.description;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM posts'
    );
    return rows.map((row) => new Post(row));
  }

  static async insert({ title, description }) {
    const { rows } = await pool.query(
      `INSERT INTO posts (title, description)
      VALUES ($1, $2)
      RETURNING created_at, title, description;`,
      [title, description]
    );
    return new Post(rows[0]);
  }
}

module.exports = { Post };
