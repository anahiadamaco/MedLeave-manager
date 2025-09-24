const register = (req, res) => {
  // Aquí iría la lógica de registro, por ahora solo devolvemos un mensaje
  res.json({
    success: true,
    message: 'Usuario registrado exitosamente',
    data: {
      email: req.body.email,
      name: req.body.name
    }
  });
};

const login = (req, res) => {
  // Aquí iría la lógica de login, por ahora solo devolvemos un mensaje
  res.json({
    success: true,
    message: 'Login exitoso',
    data: {
      email: req.body.email
    }
  });
};

module.exports = {
  register,
  login
};