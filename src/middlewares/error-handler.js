export function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Failed',
      details: err.errors,
    });
  }

  console.error(err);

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Algo deu errado.',
  });
}
