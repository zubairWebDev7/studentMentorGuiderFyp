
import { registerAdmin } from "../services/adminService.js";
import Admin from "../models/Admin.js";
import { comparePassword, generateToken } from "../utils/authUtils.js";
import User from "../models/User.js";

export const adminSignup = async(req, res) => {
    const adminCreated = await registerAdmin(req.body);
    return res.status(201).json({
        message: "Admin registered successfully",
        admin: adminCreated,
    });
};
export const adminLogin = async(req, res) => {
    const { email, password } = req.body;
    // check the admin exist in admin Collection
    
    if( !email || !password ){
        return res.status(400).json({ message: "Email and password are required" });
    }
    // also get the password and compare later
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
        return res.status(401).json({ message: "Invalid email" });
    }
    if(comparePassword(password, admin.password) === false){
        return res.status(401).json({ message: "Invalid password" });
    }
    const token = generateToken(admin._id, "admin");
    // auto set the response to cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to false in development (localhost)
      sameSite: 'lax', // Change from 'strict' to 'lax'
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'

    });
    // Placeholder for admin login logic

    return res.status(200).json({ message: "Admin login successful" });
};


export const getAllMentors = async (req, res, next) => {
  try {
    // This function should interact with the service layer to fetch all mentors
    // Placeholder implementation
    const mentors = await User.find({ role: "mentor" }).select("-password"); 

    res.json({ mentors });
  } catch (err) {
    next(err);
  }
}; export const approvedMentors = async (req, res) => {
  try {
    const { mentorId } = req.params;

    const mentor = await User.findOne({ _id: mentorId, role: "mentor" });
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found or invalid role" });
    }

    // 👇 toggle the boolean
    mentor.approved = !mentor.approved;
    await mentor.save();

    return res.status(200).json({
      message: `Mentor ${mentor.approved ? "approved" : "disapproved"} successfully`,
      mentor,
    });
  } catch (error) {
    console.error("Error toggling mentor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
