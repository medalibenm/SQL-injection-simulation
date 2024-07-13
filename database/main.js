const sqlite3 = require('sqlite3').verbose();

const initializeDatabase = () => {
  const db = new sqlite3.Database(':memory:');

  db.serialize(() => {
    db.run(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT
    )`);

    db.run(`INSERT INTO users (username, password) VALUES ('admin', 'password')`);
  });

  return db;
};

module.exports = initializeDatabase;
