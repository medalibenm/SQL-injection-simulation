const express = require('express');
const path = require('path');
const router = express.Router();

module.exports = (db) => {
  
  router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
  });


  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt with username: ${username}, password: ${password}`);
    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log(`Executing SQL: ${sql}`);
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Database error:', err.message);
        res.status(400).json({ error: err.message });
        return;
      }
      console.log(`Query result: ${JSON.stringify(rows)}`);
      if (rows.length > 0) {
        console.log('Login successful');
        res.sendFile(path.join(__dirname, '../views/admin.html'));
      } else {
        console.log('Login failed');
        res.status(401).send('Login failed');
      }
    });
  });

  return router;
};
