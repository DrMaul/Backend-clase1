import { Router } from "express";
import { CartController } from '../controller/CartController.js';

export const router=Router()

router.get("/", CartController.getCarts)

router.post('/',CartController.createCart)

router.get("/:cid", CartController.getCart)

router.post('/:cid/product/:pid', CartController.addProductToCart)

router.delete("/:cid", CartController.deleteCart)

router.delete('/:cid/product/:pid', CartController.deleteProductInCart)

router.put("/:cid", CartController.updateCart)

router.put("/:cid/product/:pid", CartController.updateProdInCart)