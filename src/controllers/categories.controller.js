const categoryModel = require("../models/categories.model");

exports.createCategories = async (request, response) => {
  try {
    const categories = await categoryModel.insert(request.body);
    if (!categories) {
      return Error("create_failed");
    }
    return response.json({
      success: true,
      masssage: `create ${request.body.name} category successfuly`,
      result: categories,
    });
  } catch (error) {
    return errorHandler(response, error);
  }
};

exports.getAllCategories = async (request, response) => {
  try {
    let data = await categoryModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    );
    return response.json({
      success: true,
      message: "Get all categories successfully",
      results: data,
    });
  } catch (error) {
    return errorHandler(response, error);
  }
};
