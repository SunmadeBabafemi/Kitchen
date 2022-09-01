const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require("compression");
const morgan = require("morgan");
const app = express()
const routes = require('./modules/routes');
const createError = require('./common/helpers/createError');
const {HTTP, RESPONSE} = require('./common/config/configConstants')


app.use(cors())
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(compression());

app.use(function (_err, _req, _res, _) {
  if (_err instanceof SyntaxError) {
    return _res.status(HTTP.BAD_REQUEST).json({
      code: HTTP.UNPROCESSABLE_ENTITY,
      status: RESPONSE.ERROR,
      message: "Invalid JSON payload passed.",
      data: null,
    });
  }
});

const apiRouter = express.Router()

apiRouter.use(routes())
const apiURL =  `/kitchen/v1`
app.use(apiURL, apiRouter)

apiRouter.use((_req, _res, next) => {
    next(
        createError(HTTP.NOT_FOUND,[
            {
                code: HTTP.NOT_FOUND,
                status: RESPONSE.ERROR,
                message: "Route not found.",
                data: null,
            },
        ])
    )
})

apiRouter.use((error, _req, res, _next) => {
  console.log(error);
  const initialError = error;
  if (!error.statusCode) {
    error = createError(HTTP.SERVER_ERROR, [
      {
        code: HTTP.SERVER_ERROR,
        status: RESPONSE.ERROR,
        message: initialError.message || "Internal Server Error.",
        data: error.data,
        stack: error.stack,
      },
    ]);
  }

  return res.status(error.statusCode).json({
    code: error.code,
    status: error.status,
    message: error.message,
    data: error.data || null,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });

});



module.exports = app