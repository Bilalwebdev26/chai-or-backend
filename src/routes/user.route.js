import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAvatarimg,
  updateCoverimg,
  updateProfileNames,
} from "../controllers/user.contoller.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
//secure routes
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refreshtoken").post(refreshAccessToken);
router.route("/updateusername").put(verifyJwt, updateProfileNames);
router.route("/changepassword").post(verifyJwt, changeCurrentPassword);
router.route("/getcurrentuser").get(verifyJwt,getCurrentUser)
router
  .route("/updateavatarimage")
  .post(verifyJwt, upload.single("avatar"), updateAvatarimg);
router
  .route("/updatecoverimage")
  .patch(verifyJwt, upload.single("coverImage"), updateCoverimg);
router.route("/c/:username").get(verifyJwt, getUserChannelProfile);
router.route("/watchHistory").get(verifyJwt, getWatchHistory);

export default router;
