const dotenv = require('dotenv')
dotenv.config()

exports.KEYS = {
    mongoURI: process.env.MONGODBURI,
}

exports.RESPONSE = {
  SUCCESS: "success",
  ERROR: "error",
};

exports.HTTP = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  UNPROCESSABLE_ENTITY: 422,
};

exports.JWT = {
    secret: process.env.JWT_SECRET,
    time: process.env.JWT_TIME
}