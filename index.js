const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const initializeDatabase = require('./database/main');
const app = express();
const PORT = 3000;


const db = initializeDatabase();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const mainRoutes = require('./routes/main')(db);
app.use('/', mainRoutes);


app.use(express.static(path.join(__dirname, 'views')));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
