const errorHandler = require("../helpers/errorHandler");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = process.env;
const authMiddleweres = (request, response, next) => {
  try {
    const { authorization: auth } = request.headers;
    if (!auth && !auth?.startsWith("Bearer ")) {
      throw Error("unauthorized");
    }

    const token = auth.slice(7);
    request.user = jwt.verify(token, APP_SECRET);
    return next();
  } catch (error) {
    return errorHandler(response, error);
  }
};

module.exports = authMiddleweres;
