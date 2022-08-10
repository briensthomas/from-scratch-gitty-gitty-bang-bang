const pool = require('../utils/pool');

class GithubUser {
  id;
  username;
  email;
  avatar;

  constructor({ id, username, email, avatar }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatar = avatar;
  }

  static async create(username, email, avatar) {
    if (!username) throw new Error('Username required');

    const { rows } = await pool.query(
      `INSERT INTO github_users
        (username, email, avatar)
        VALUES ($1, $2, $3)
        RETURNING *;`,
      [username, email, avatar]
    );

    return new GithubUser(rows[0]);
  }

}

module.exports = { GithubUser };
