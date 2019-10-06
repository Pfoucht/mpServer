const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const seed = require('./seeding');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const jwt = require('jsonwebtoken');

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
const { 
  listRoutes,
  movieRoutes,
  authRoutes,
  favoriteRoutes,
  socialRoutes
} = require('./routes');

app.get('/', (req, res) => {
  res.send(`<img src="https://i.ytimg.com/vi/PdPpWBr6PQ0/maxresdefault.jpg"/>`);
})

app.use('/auth', authRoutes);

// app.use(checkToken);

app.use('/lists', listRoutes);
app.use('/movies', movieRoutes);
app.use('/favorite', favoriteRoutes);
app.use('/social', socialRoutes);





app.listen(PORT, () => {
  seed();
  console.log(`Listening on port ${PORT}`)
})



// function checkToken(req, res, next){
//     console.log('checking token');
//     let token = req.headers['authorization'];
//     if(token.startsWith('Bearer')){
//       token = token.slice(7, token.length);
//     }

//     if(token){
//       jwt.verify(token, 'secret', (err, decoded) => {
//         if(err){
//           return res.status(404).json({
//             success: false,
//             message: 'There was a problem with your request. Please relogin to the app.',
//             error: 'There was a problem with your request. Please reload the app.'
//           })
//         }else{
//           console.log(token);
//           console.log('Token was provided');
//           req.user = decoded;
//           next();
//         }
//       })
//     }else{
//       return res.status(404).json({
//         success: false,
//         error: 'No JWT token was given, please reload the app.',
//       })
//     }
// }
