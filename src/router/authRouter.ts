import { Router } from "express";
import { loginMiddleware, studentMiddleware, userMiddleware } from "../middleware/validationSchema";
import { deleteId, filterData, getDataMinAge, studentControllers, studentGet, studentId, updatedDataG } from "../controller/studentControllers";
import { loginController, userController } from "../controller/userController";

import { verifyToken } from "../middleware/verifyToken";


export const router=Router();

router.post("/signup",userMiddleware,userController);
router.post("/login",loginMiddleware, loginController);
router.post("/postData",verifyToken,studentMiddleware,studentControllers);
router.get("/getalldata",verifyToken,studentMiddleware,studentGet);
router.get("/students/:id",verifyToken,studentMiddleware,studentId);
router.delete("/students/:id",verifyToken,studentMiddleware,deleteId);
router.put("/updatedata",verifyToken,studentMiddleware,updatedDataG);
router.get("/students",verifyToken,filterData);
router.get("/studentage",verifyToken,getDataMinAge);


