module.exports = {
  typeorm: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'my-system-viewer',
    password: 'my-system-viewer',
    database: 'my-system-viewer',
  },
  temperatures: {
    count_last_items: 10,
  }
}