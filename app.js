const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require('path');

require('dotenv').config()

const sauceRoutes = require('./routes/sauce.js');
const userRoutes = require('./routes/user.js');

const app = express();
app.use(helmet())


mongoose.connect(process.env.DB_URI,
  { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
  })

  app.use(bodyParser.json());

    
  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/api/sauces', sauceRoutes);
  app.use('/api/auth', userRoutes);

   
module.exports = app;