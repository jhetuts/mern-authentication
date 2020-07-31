const notFound = (req, res) => {
  const error = `Not found - ${req.originalUrl}`;
  res.status(404).json({
    message: error,
  });
};

module.exports = {
  notFound,
};
