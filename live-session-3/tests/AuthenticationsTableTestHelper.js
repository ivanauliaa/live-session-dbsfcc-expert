/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AuthenticationsTableTestHelper = {
  async addToken(token) {
    const stmt = {
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token],
    };

    await pool.query(stmt);
  },
  async findToken(token) {
    const stmt = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await pool.query(stmt);
    return result.rows;
  },
  async cleanTable() {
    const stmt = 'TRUNCATE authentications';
    await pool.query(stmt);
  },
};

module.exports = AuthenticationsTableTestHelper;
