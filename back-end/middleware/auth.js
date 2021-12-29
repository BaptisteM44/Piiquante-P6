const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;
    // autorisation si l'userID existe et correspond
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Utilisateur invalide';
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: new Error('Requête invalide!')
    });
  }
};