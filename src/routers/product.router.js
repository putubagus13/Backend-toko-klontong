const productRouter = require("express").Router();
const productController = require("../controllers/product.controller");

productRouter.post("/", productController.addProduct);
productRouter.get("/", productController.getAllProduct);
productRouter.get("/:id", productController.getDetailProduct);
productRouter.patch("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

module.exports = productRouter;
