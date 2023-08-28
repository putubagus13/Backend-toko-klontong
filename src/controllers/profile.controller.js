const profileModel = require("../models/profile.model");
const errorHandler = require("../helpers/errorHandler");
const userModel = require("../models/user.model");

exports.updateProfile = async (request, response) => {
  try {
    const { id } = request.user;
    const user = profileModel.findOne(id);
    if (!user) {
      throw Error("user_not_found");
    }
    const data = { ...request.body };
    await userModel.update(id, data);
    const profile = await profileModel.update(id, data);
    let updateUser;
    if (data.email) {
      updateUser = await userModel.update(id, data);
    } else {
      updateUser = await userModel.findOne(id);
    }

    const result = {
      ...profile,
      email: updateUser?.email,
      username: updateUser?.username,
    };

    return response.json({
      success: true,
      message: "Profile updated success",
      result,
    });
  } catch (error) {
    return errorHandler(response, error);
  }
};

exports.getProfile = async (request, response) => {
  try {
    const { id } = request.user;
    const profile = await profileModel.findOneByUserId(id);
    if (!profile) {
      throw Error("user_not_found");
    }
    return response.json({
      success: true,
      message: "Profile",
      results: profile,
    });
  } catch (error) {
    return errorHandler(response, error);
  }
};
