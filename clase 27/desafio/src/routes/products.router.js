import { Router } from "express";
import { auth } from '../middleware/auth.js';
import { ProductController } from "../controller/ProductController.js";
export const router=Router()


router.get("/", ProductController.getProducts)

router.get("/:pid", ProductController.getProduct )

router.post('/',auth,ProductController.createProduct)

router.put("/:pid", ProductController.updateProduct)

router.delete("/:pid", ProductController.deleteProduct)

