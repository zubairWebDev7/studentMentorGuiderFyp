import express from "express";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createMentorSchema } from "../utils/validators.js";
import { createMentor, deleteProfilePicture, getChatsAsMentor, getChatsAsMentor1, getMentorProfile, getPreviousChat, getPreviousChatList, loginMentor, uploadPicture } from "../controllers/mentorController.js";
import { mentorVerification } from "../middlewares/mentorVerification.js";
import upload from "../middlewares/uploadImage.js";

const router = express.Router();

router.post("/signup", validateRequest(createMentorSchema), createMentor);
router.post("/login", loginMentor)
router.get("/profile", mentorVerification, getMentorProfile);
router.post("/uploadProfile", mentorVerification, upload.single("image"),
    uploadPicture)
router.delete("/deleteProfilePicture", mentorVerification, deleteProfilePicture)

router.get("/previouseChat/list", mentorVerification, getChatsAsMentor);
router.get("/previouseChat/:studentId", mentorVerification, getChatsAsMentor1)
export default router;
