const errorHendle = require("../helpers/errorHandler");
const userModel = require("../models/user.model");
const profileModel = require("../models/profile.model");
const forgotRequestModel = require("../models/forgotRequest.model");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = process.env;
const argon = require("argon2");

exports.login = async (request, response) => {
  try {
    const { email, password } = request.body;
    console.log(email, password);
    const user = await userModel.findOneByEmail(email);
    if (!user) {
      throw Error("wrong_credentials");
    }
    const verify = await argon.verify(user.password, password);
    if (!verify) {
      throw Error("wrong_credentials");
    }
    const token = jwt.sign({ id: user.id }, APP_SECRET);
    return response.json({
      success: true,
      message: "Login Success!",
      results: token,
    });
  } catch (error) {
    return errorHendle(response, error);
  }
};

exports.register = async (request, response) => {
  try {
    const { fullName, username, password } = request.body;
    const hash = await argon.hash(password);
    const data = {
      ...request.body,
      password: hash,
    };
    const UsernameExist = await userModel.findByUserName(username);
    console.log(data.username);
    if (!UsernameExist) {
      const user = await userModel.insert(data);
      const profileData = {
        fullName,
        userId: user.id,
      };
      await profileModel.insert(profileData);
      const token = jwt.sign({ id: user.id }, APP_SECRET);
      return response.json({
        success: true,
        message: "Register Success!",
        results: token,
      });
    }
    if (UsernameExist.username == data.username) {
      throw Error("username_alredy_exist");
    }
  } catch (error) {
    return errorHendle(response, error);
  }
};

exports.forgotRequest = async (request, response) => {
  try {
    const { email } = request.body;
    const user = await userModel.findOneByEmail(email);
    if (!user) {
      throw Error("user_not_found");
    }
    const forgotReq = await forgotRequestModel.findOneByEmail(email);
    if (forgotReq) {
      throw Error("request already exists");
    }
    const randomNumber = Math.random();
    const rounded = Math.round(randomNumber * 1000);
    const padded = String(rounded).padEnd(6, "0");

    const forgot = await forgotRequestModel.insert({
      email: user.email,
      code: padded,
    });
    if (!forgot) {
      throw Error("forgot_failed");
    }
    return response.json({
      success: true,
      message: "Request sent",
    });
  } catch (error) {
    return errorHendle(response, error);
  }
};

exports.resetPassword = async (request, response) => {
  try {
    const { code, email, password } = request.body;
    const find = await forgotRequestModel.findOneByEmail(email);
    console.log(find);
    if (!find) {
      throw Error("Reset_failed");
    }
    if (code !== find.code) {
      throw Error("code_wrong");
    }
    const selectedUser = await userModel.findOneByEmail(email);
    const data = {
      password: await argon.hash(password),
    };

    const user = await userModel.update(selectedUser.id, data);
    if (!user) {
      throw Error("Reset_failed");
    }
    await forgotRequestModel.destroy(email);
    return response.json({
      success: true,
      message: "Reset password success",
    });
  } catch (error) {
    return errorHendle(response, error);
  }
};
