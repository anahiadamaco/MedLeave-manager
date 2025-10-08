const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const mensaje = err.message || 'Error en el servidor';

  console.error('❌ Error:', mensaje);

  res.status(statusCode).json({
    error: true,
    mensaje
  });
};

module.exports = errorHandler;