// import conversationModel from "../models/conversationModel.js";
import Student from "../models/Student.js";
import User from "../models/User.js";
import { comparePassword, generateToken, hashPassword } from "../utils/authUtils.js";


export const signupStudent = async(req, res) => {
    const { name, email, password, educationLevel, careerGoals, interests, languagePreference } = req.body;
    const hashedPassword =await hashPassword(password);
    const newStudent = {
        name,
        email,
        password:hashedPassword,
        educationLevel,
        careerGoals,
        interests,
        languagePreference
    };
    console.log("New Student Signup:", newStudent);
    const studentCreated =await  Student.create(newStudent);
    res.status(201).json({ message: "Student signed up successfully",
        student: studentCreated
     });

};
export const loginStudent = async(req, res) => {
    const { email, password } = req.body;
    const studentInDb = await Student.findOne({ email: email });
    if(!studentInDb){
        return res.status(401).json({ message: "Invalid email" });

    }
    if(comparePassword(password, studentInDb.password) === false){
        return res.status(401).json({ message: "Invalid password" });
    }
    const token = generateToken(studentInDb._id, "student");
    // auto set the response to cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to false in development (localhost)
      sameSite: 'lax', // Change from 'strict' to 'lax'
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'

    });
    return res.status(200).json({ message: "Student login successful",
        accessToken: token, 
        role:"student"
     });
};
export const getStudentProfile = async (req, res) => {
    try {
        console.log("the student ");
    
    console.log("req user with id", req.user);
    const studentId = req.user.id;
    const student = await Student.findById(studentId).select("-password");
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ student , 
    message: "Student profile fetched successfully"
    });
    } catch (error) {
        console.error("Error toggling mentor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
    }


}
export const getMentors = async (req, res)=>{
     try {
    // This function should interact with the service layer to fetch all mentors
    // Placeholder implementation
    const mentors = await User.find({ role: "mentor" , approved:true , status:"active"}).select("-password"); 

    res.json({ mentors });
  }catch(err){
    console.error("Error toggling mentor:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
export const SuggestFromAi = async(req, res)=>{


}

import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
// import User from "../models/userModel.js"; // mentors

export const getChats = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const studentId = req.user.id; // ✅ from token

    if (!mentorId || !studentId) {
      return res.status(400).json({ message: "Mentor ID or Student ID missing" });
    }

    // ✅ Check if conversation exists between student & mentor
    let conversation = await Conversation.findOne({
      participants: { $all: [mentorId, studentId] },
    });
    console.log("the converstaion of the user ", conversation);
    

    // ✅ Create if not exist
    if (!conversation) {
      console.log("the ew concverstation");
      
      conversation = await Conversation.create({
        participants: [studentId, mentorId],
      });
    }

    // ✅ Fetch messages
    const messages = await Message.find({ conversationId: conversation._id })
console.log("rge messages between them", messages);

    // ✅ Fetch mentor info
    const mentor = await User.findById(mentorId).select("name profilePicture");

    // ✅ Format response
    const formattedMessages = messages.map((msg) => ({
      _id: msg._id,
      text: msg.text,
      senderId: msg.senderId,
      senderType: msg.senderId.toString() === studentId.toString() ? "student" : "mentor",
      createdAt: msg.createdAt,
    }));

    return res.status(200).json({
      mentor: {
        name: mentor?.name || "Unknown Mentor",
        profilePicture: mentor?.profilePicture?.url || null,
      },
      messages: formattedMessages,
    });
  } catch (error) {
    console.error("❌ Error fetching chat:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
