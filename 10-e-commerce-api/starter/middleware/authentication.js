const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }

  try {
    // const payload = isTokenValid({ token }); //1
    const { name, userId, role } = isTokenValid({ token }); //3
    req.user = { name, userId, role }; //4
    // console.log(payload); //2
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
};

const authorizePermissions = (req, res, next) => {
  //   console.log('admin route');
  if (req.user.role !== 'admin') {
    throw new CustomError.UnauthorizedError(
      'Unauthorized to access this route'
    );
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
