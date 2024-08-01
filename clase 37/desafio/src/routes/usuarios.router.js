import { Router } from "express";
import { UserController } from "../controller/UserController.js";
import { auth } from "../middleware/auth.js";


export const router=Router()

router.get("/premium/:id", auth(["admin","user","premium"]),UserController.cambiarRol)

router.get("/rol/:id", auth(["admin","user","premium"]),UserController.getRol)

router.get("/getUsuarios",UserController.getUsuarios)

