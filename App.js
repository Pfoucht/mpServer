const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const seed = require('./seeding');
const dotenv = require('dotenv').config({path: __dirname + '/.env'})

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
const { 
  listRoutes,
  movieRoutes,
  authRoutes,
  favoriteRoutes
} = require('./routes');

app.get('/', (req, res) => {
  res.send(`<img src="https://i.ytimg.com/vi/PdPpWBr6PQ0/maxresdefault.jpg"/>`);
})

app.use('/lists', listRoutes);
app.use('/movies', movieRoutes);
app.use('/favorite', favoriteRoutes);
app.use('/auth', authRoutes);


app.listen(PORT, () => {
  seed();
  console.log(`Listening on port ${PORT}`)
})
