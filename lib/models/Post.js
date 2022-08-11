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
}

module.exports = { Post };
