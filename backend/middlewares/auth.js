const jwt = require('jsonwebtoken');
const BadAuthError = require('../errors/bad-auth-error');

const JWT_SECRET = 'KanbuSquidGame';

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new BadAuthError('Ошибка авторизации'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new BadAuthError('Ошибка авторизации'));
  }

  req.user = payload;

  next();
};

module.exports = { auth };
