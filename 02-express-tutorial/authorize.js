const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === 'john') {
    req.user = { name: 'Nitish', age: 30 };
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

module.exports = authorize;
