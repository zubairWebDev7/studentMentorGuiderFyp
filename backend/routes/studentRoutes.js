import express from "express";
import { getChats, getMentors, getStudentProfile, loginStudent, recentChats, signupStudent, SuggestFromAi } from "../controllers/studentController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { studentLoginSchema, studentSignupSchema } from "../utils/validators.js";
import { studentVerification } from "../middlewares/studentVerification.js";
// import { signup } from "../controllers/studentController";
const studentRouter = express.Router();


// signup student 
studentRouter.post("/signup",validateRequest(studentSignupSchema), signupStudent);
studentRouter.post("/login",validateRequest(studentLoginSchema),  loginStudent);
studentRouter.get("/profile", studentVerification, getStudentProfile );
studentRouter.get('/all-mentor',studentVerification, getMentors )
studentRouter.post("/AISuggestion",studentVerification, SuggestFromAi )
studentRouter.get("/previouseChat/:mentorId",studentVerification, getChats  )
// get the student chat to mentor only getChats of that mentor that have student messaegs 
studentRouter.get("/studentchat",studentVerification, recentChats)





export default studentRouter;