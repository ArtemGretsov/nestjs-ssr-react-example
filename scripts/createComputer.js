const { Pool } = require('pg');
const config = require('config');

const computerName = process.argv[2];
const computerCode = process.argv[3];

const pool = new Pool({
  host: config.get('typeorm.host'),
  port: config.get('typeorm.port'),
  user: config.get('typeorm.username'),
  password: config.get('typeorm.password'),
  database: config.get('typeorm.database'),
})

const query = (queryString) => new Promise((resolve, reject) => {
  pool.query(queryString, (err, res) => {
    if (err) {
      reject(err);
    }

    resolve(res);
  })
});

createComputer = async () => {
  try {

    if (!computerName || !computerCode) {
      throw new Error('args required');
    }
    await query(`INSERT INTO computers(id, name, code, is_active) VALUES(DEFAULT, '${computerName}', '${computerCode}', true)`);

  } catch (e) {
    console.log('oops! Something went wrong!', e);
  } finally {
    pool.end();
  }
}

createComputer()