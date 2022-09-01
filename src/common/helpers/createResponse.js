exports.createResponse =
  (message, data = [], pagination, status = "success") =>
  (res, code) => {
    return res.status(code).json({ code, status, message, data, pagination });
  };