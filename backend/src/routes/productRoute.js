import { Router } from "express";
import {getAllProducts, createProduct, updateProduct, deleteProduct} from "../controllers/productController.js"
import verifyJWT from "../middleware/verifyJWT.js"
import verifyAdmin from "../middleware/verifyAdmin.js"


const router = Router();

router.use(verifyJWT)

router.get("/", getAllProducts)
router.post("/", createProduct)
router.patch("/:id", verifyAdmin, updateProduct)
router.delete("/:id", verifyAdmin, deleteProduct)

export default router;