const { Pool } = require('pg');
const crypto = require('crypto');
const config = require('config');

const computerCode = process.argv[2];

const pool = new Pool({
  host: config.get('typeorm.host'),
  port: config.get('typeorm.port'),
  user: config.get('typeorm.username'),
  password: config.get('typeorm.password'),
  database: config.get('typeorm.database'),
})

const generateRandomString = (count) => {
  return crypto.randomBytes(count).toString('hex');
}

const salt = generateRandomString(20);
const apiKey = generateRandomString(40);
const rawSecretKey = generateRandomString(40);

const secretKey = crypto.createHmac('sha256', salt)
  .update(rawSecretKey)
  .digest('hex');

const query = (queryString) => new Promise((resolve, reject) => {
  pool.query(queryString, (err, res) => {
    if (err) {
      reject(err);
    }

    resolve(res);
  })
});

createApiKey = async () => {
  try {

    const computer = await query(`SELECT id from computers WHERE code = '${computerCode}'`);

    if (!computer.rows.length) {
      throw new Error('computer not found');
    }

    await query(`INSERT INTO api_keys(id, api_key, secret_key, salt, computer_id) values(DEFAULT, '${apiKey}', '${secretKey}', '${salt}', ${computer.rows[0].id})`)
    console.log('Copy keys! \n', {
      apiKey,
      secretKey: rawSecretKey,
    });
  } catch (e) {
    console.log('oops! Something went wrong!', e);
  } finally {
    pool.end();
  }
}

createApiKey()