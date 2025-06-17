import { Router } from "express";
import {getAllCategories, createCategory, updateCategory, deleteCategory} from "../controllers/categoryController.js"
import verifyJWT from "../middleware/verifyJWT.js"
import verifyAdmin from "../middleware/verifyAdmin.js"


const router = Router();

router.use(verifyJWT)

router.get("/", getAllCategories)
router.post("/", createCategory)
router.patch("/:id", verifyAdmin, updateCategory)
router.delete("/:id", verifyAdmin, deleteCategory)

export default router;