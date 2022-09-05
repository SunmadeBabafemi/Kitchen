const mongoose = require("mongoose");
const { HTTP, RESPONSE } = require("../common/config/configConstants");
const createError = require("../common/helpers/createError");
const User = require("../modules/users/user.model");
const Admin = require("../modules/admin/admin.model")


exports.checkExistingUser = async (req, _, next) => {
  let { username, email, phone_number } = req.body;

  try {
    const userEmail =
      email && (await User.findOne({ email: email.toLowerCase()}));
    const userName =
      username && (await User.findOne({ username: username }));
    const phoneNumber = phone_number && (await User.findOne({ phone_number}));

    if (
      userEmail &&
      (req.userId ? !userEmail._id.equals(req.userId) : !req.userId)
    ) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `user with this email already exists`,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }

    if (
      userName &&
      (req.userId ? !userName._id.equals(req.userId) : !req.userId)
    ) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `user with this username already exists`,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }

    if (
      phoneNumber &&
      (req.userId ? !userName._id.equals(req.userId) : !req.userId)
    ) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `user with this phone number already exists`,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }

    return next();
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};

exports.checkExistingAdmin = async (req, _, next) => {
  let { username, email, phone_number } = req.body;

  try {
    const adminEmail =
      email && (await Admin.findOne({ email: email.toLowerCase()}));
    const userName =
      username && (await Admin.findOne({ username: username }));
    const phoneNumber = phone_number && (await Admin.findOne({ phone_number}));

    if (
      adminEmail &&
      (req.userId ? !adminEmail._id.equals(req.userId) : !req.userId)
    ) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `admin with this email already exists`,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }

    if (
      userName &&
      (req.userId ? !userName._id.equals(req.userId) : !req.userId)
    ) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `admin with this username already exists`,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }

    if (
      phoneNumber &&
      (req.userId ? !userName._id.equals(req.userId) : !req.userId)
    ) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `admin with this phone number already exists`,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }

    return next();
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
