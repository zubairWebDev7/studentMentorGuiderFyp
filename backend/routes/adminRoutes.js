import express from "express";
import { adminLogin, adminSignup } from "../controllers/adminController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { adminSignupSchema } from "../validations/adminValidation.js";
import { adminLoginSchema } from "../validations/adminValidation.js";
import { adminVerification } from "../middlewares/adminVerification.js";
import { approvedMentors, getAllMentors } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/signup", validateRequest(adminSignupSchema), adminSignup);
adminRouter.post("/login",validateRequest(adminLoginSchema), adminLogin);
adminRouter.post("/logout", (req, res) => {
    
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });

  
  res.json({ message: "Admin logged out successfully" });
})
adminRouter.get("/mentors",adminVerification, getAllMentors);
// adminRoutes.js
adminRouter.put("/mentors/:mentorId", adminVerification, approvedMentors);


export default adminRouter;
                                  