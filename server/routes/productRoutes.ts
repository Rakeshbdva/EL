import { Router } from "express";
import { ProductController } from "../controllers/productController.js";
import { authenticateToken } from "../middleware/auth.js";
import { upload } from "../utils/multer.js";

const router = Router();
const productController = new ProductController();

// All product routes require authentication
router.use(authenticateToken);

// CRUD routes
router.get("/", productController.getAllProducts.bind(productController));
router.get("/:id", productController.getProductById.bind(productController));
router.post("/", productController.createProduct.bind(productController));
router.put("/:id", productController.updateProduct.bind(productController));
router.delete("/:id", productController.deleteProduct.bind(productController));

// Special operations
router.post("/:id/duplicate", productController.duplicateProduct.bind(productController));

// File operations
router.get("/export/excel", productController.exportProducts.bind(productController));
router.post("/import/excel", upload.single("file"), productController.importProducts.bind(productController));
router.post("/upload/image", upload.single("image"), productController.uploadImage.bind(productController));

export { router as productRoutes };