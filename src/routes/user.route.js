import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJwt} from "../middlewares/auth.middleware.js"
import {changeCurrentPassword, loginUser, logoutUser, refreshAccessToken, registerUser, updateAvatarimg, updateProfileNames} from "../controllers/user.contoller.js"
const router = Router()

router.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]),registerUser)

router.route("/login").post(loginUser)
//secure routes
router.route("/logout").post(verifyJwt,logoutUser)
router.route("/refreshtoken").post(refreshAccessToken)
router.route("/updateusername").put(verifyJwt,updateProfileNames)
router.route("/changepassword").post(verifyJwt,changeCurrentPassword)
router.route("/updateavatarimage").put(verifyJwt,updateAvatarimg)


export default router;