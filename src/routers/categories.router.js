const catogoriesRouter = require("express").Router();
const categoriesController = require("../controllers/categories.controller");

catogoriesRouter.get("/", categoriesController.getAllCategories);

module.exports = catogoriesRouter;
