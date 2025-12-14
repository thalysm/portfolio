const authService = require('../../application/services/authService');

class AuthController {
  /**
   * Lida com a requisição de login.
   * @param {import('express').Request} req - O objeto de requisição.
   * @param {import('express').Response} res - O objeto de resposta.
   */
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
      const { token, refreshToken } = await authService.loginUser(email, password);
      res.status(200).json({ token, refreshToken });
    } catch (error) {
      if (error.message === 'Credenciais inválidas') {
        return res.status(401).json({ message: error.message });
      }
      // Log de erro interno
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async refreshToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token é obrigatório' });
    }

    try {
      const token = await authService.refreshAccessToken(refreshToken);
      res.status(200).json({ token });
    } catch (error) {
      res.status(403).json({ message: 'Refresh token inválido ou expirado' });
    }
  }
}

// Exportamos uma instância
module.exports = new AuthController();