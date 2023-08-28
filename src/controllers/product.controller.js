const productModel = require("../models/product.model");
const skuModel = require("../models/skuProduct.model");
const errorHandler = require("../helpers/errorHandler");

exports.addProduct = async (request, response) => {
  try {
    const skuProduct = await skuModel.addSku(request.body);
    const data = {
      ...request.body,
      skuId: skuProduct.id,
    };
    const product = await productModel.insert(data);
    return response.json({
      success: true,
      message: "Add Product success",
      results: product,
    });
  } catch (error) {
    return errorHandler(response, error);
  }
};

exports.getAllProduct = async (request, response) => {
  try {
    const { rows: results, pageInfo } = await productModel.findAll(
      request.query.search,
      request.query.page,
      request.query.sortBy,
      request.query.sort,
      request.query.category,
      request.query.sku,
      request.query.limit
    );

    return response.json({
      success: true,
      massage: "List of all product",
      pageInfo,
      results,
    });
  } catch (error) {
    return errorHandler(response, error);
  }
};

exports.getDetailProduct = async (request, response) => {
  try {
    const { id } = request.params;
    console.log(id);
    const detailProduct = await productModel.fineOne(id);
    if (!detailProduct) {
      throw Error("Product not found");
    }
    return response.json({
      success: true,
      message: "Get detail product success",
      results: detailProduct,
    });
  } catch (error) {
    return errorHandler(response, error);
  }
};

exports.updateProduct = async (request, response) => {
  try {
    const { id } = request.params;
    const data = request.body;
    const checkProduct = await productModel.fineOne(id);
    if (!checkProduct) {
      throw Error("Product not found");
    }
    console.log(checkProduct);
    const updateSKU = await skuModel.updateSku(checkProduct.sku, data);
    console.log(updateSKU);
    const updateProduct = await productModel.update(id, data);
    return response.json({
      success: true,
      message: "Update product success",
      results: updateProduct,
    });
  } catch (error) {
    return errorHandler(response, error);
  }
};

exports.deleteProduct = async (request, response) => {
  try {
    const { id } = request.params;
    const checkProduct = await productModel.fineOne(id);
    if (!checkProduct) {
      throw Error("Product not found");
    }
    await skuModel.destroy(checkProduct.skuId);
    const dlt = await productModel.destroy(id);
    return response.json({
      success: true,
      message: "Delete product success",
      results: dlt,
    });
  } catch (error) {
    return errorHandler(response, error);
  }
};
