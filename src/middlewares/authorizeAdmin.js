const {HTTP, RESPONSE,} = require('../common/config/configConstants')
const Admin = require('../modules/admin/admin.model')
const createError = require('../common/helpers/createError')
const RefreshToken = require('../modules/users/userRefreshToken')
const jwt = require('../common/utils/jwt.utils')

exports.authSuperAdminCheck = async (req, _, next) => {
  const message = "Unauthorized" 
  const token = 
  req.headers['authorization']&& req.headers['authorization'].split(' ')[1] 

  if(!token){
      return next(
          createError(HTTP.UNAUTHORIZED, [
              {
                  status: RESPONSE.ERROR,
                  message,
                  statusCode: HTTP.UNAUTHORIZED,
              }
          ])
      )
  }
  try {
      const {id} = jwt.decodeJWT(token)
      const admin = await Admin.findOne({_id: id, role: "super"})
      if(!admin){
          return next(
              createError(HTTP.UNAUTHORIZED, [
              {
                  status: RESPONSE.ERROR,
                  message,
                  statusCode: HTTP.UNAUTHORIZED,
              },
              ])
          );
      }
      if (admin) {
          req.userId = id;
          req.user = admin;
          req.token = token;
          return next();
      }

      return next(
      createError(HTTP.UNAUTHORIZED, [
          {
          status: RESPONSE.ERROR,
          message,
          statusCode: HTTP.UNAUTHORIZED,
          },
      ])
      );
  } catch (error) {
      console.log(error);
      return next(createError.InternalServerError());
  }
}

exports.authAdminCheck = async (req, _, next) => {
  const message = "Unauthorized" 
  const token = 
  req.headers['authorization']&& req.headers['authorization'].split(' ')[1] 

  if(!token){
      return next(
          createError(HTTP.UNAUTHORIZED, [
              {
                  status: RESPONSE.ERROR,
                  message,
                  statusCode: HTTP.UNAUTHORIZED,
              }
          ])
      )
  }
  try {
      const {id} = jwt.decodeJWT(token)
      const admin = await Admin.findOne({_id: id})
      if(!admin){
          return next(
              createError(HTTP.UNAUTHORIZED, [
              {
                  status: RESPONSE.ERROR,
                  message,
                  statusCode: HTTP.UNAUTHORIZED,
              },
              ])
          );
      }
      if (admin) {
          req.userId = id;
          req.user = admin;
          req.token = token;
          return next();
      }

      return next(
      createError(HTTP.UNAUTHORIZED, [
          {
          status: RESPONSE.ERROR,
          message,
          statusCode: HTTP.UNAUTHORIZED,
          },
      ])
      );
  } catch (error) {
      console.log(error);
      return next(createError.InternalServerError());
  }
}