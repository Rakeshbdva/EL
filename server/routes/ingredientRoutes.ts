import { Router } from "express";
import { IngredientController } from "../controllers/ingredientController.js";
import { authenticateToken } from "../middleware/auth.js";
import { upload } from "../utils/multer.js";

const router = Router();
const ingredientController = new IngredientController();

// All ingredient routes require authentication
router.use(authenticateToken);

// CRUD routes
router.get("/", ingredientController.getAllIngredients.bind(ingredientController));
router.get("/categories", ingredientController.getAllCategories.bind(ingredientController));
router.get("/category/:category", ingredientController.getIngredientsByCategory.bind(ingredientController));
router.get("/:id", ingredientController.getIngredientById.bind(ingredientController));
router.post("/", ingredientController.createIngredient.bind(ingredientController));
router.put("/:id", ingredientController.updateIngredient.bind(ingredientController));
router.delete("/:id", ingredientController.deleteIngredient.bind(ingredientController));

// Special operations
router.post("/:id/duplicate", ingredientController.duplicateIngredient.bind(ingredientController));

// File operations
router.get("/export/excel", ingredientController.exportIngredients.bind(ingredientController));
router.post("/import/excel", upload.single("file"), ingredientController.importIngredients.bind(ingredientController));

export { router as ingredientRoutes };