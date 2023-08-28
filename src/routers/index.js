const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
router.get("/", (request, response) => {
  return response.json({
    success: true,
    massage: "Backend is running well",
  });
});

router.use("/auth", require("./auth.router"));
router.use("/profile", authMiddleware, require("./profile.router"));
router.use("/products", authMiddleware, require("./product.router"));
router.use("/categories", authMiddleware, require("./categories.router"));

router.use("*", (request, response) => {
  return response.status(404).json({
    success: false,
    massage: "Resorce not found",
  });
});

module.exports = router;
