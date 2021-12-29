const express = require('express');
const helmet = require("helmet");
const mongoose = require('mongoose');
const path = require('path');


const dotenv = require("dotenv");

dotenv.config();


const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
//connexion à la base de données
mongoose.connect(process.env.DB_USER,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// ajout des headers pour les requêtes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Parser le corps des réponses en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gestion des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Lancement helmet
app.use(helmet());

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;