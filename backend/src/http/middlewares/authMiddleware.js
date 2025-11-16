const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware para verificar o token JWT.
 * @param {import('express').Request} req - O objeto de requisição.
 * @param {import('express').Response} res - O objeto de resposta.
 * @param {import('express').NextFunction} next - A próxima função de middleware.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Adiciona o payload do token (ex: { id, email }) ao req
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Token inválido.' });
  }
}

module.exports = authMiddleware;