import { Router } from "express";
import { loginMiddleware, studentMiddleware, userMiddleware } from "../middleware/validationSchema";
import { studentControllers } from "../controller/studentControllers";
import { loginController, userController } from "../controller/userController";
import { verify } from "crypto";
import { verifyToken } from "../middleware/verifyToken";


export const router=Router();

router.post("/signup",userMiddleware,userController);
router.post("/login",loginMiddleware, loginController);
router.post("/postData",studentMiddleware,studentControllers);
router.get("/getallData",verifyToken,)
router.get("/students/:id",)
