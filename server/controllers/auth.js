import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from '../models/User.js';
import News from '../models/News.js'

//REGISTER OR SIGNUP CODE

export const register = async(req,res)=>{
    try {
        console.log(req.body)
        
        const {userName,email,password,picturePath} = req.body;
      
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({ userName,email,password:passwordHash,picturePath });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error:error.message}); 
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({ msg: "User doesn't exist"});
        } 

        const isMatch = await  bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ msg: "Invalid Password!!"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token,user});
    } catch (error) {
        res.status(500).json({ error:error.message});
    }
}

export const editProfile = async(req,res)=>{
    try {
        console.log(req.body);

        const { _id, userName, email, picturePath } = req.body;
        const user = await User.findById(_id);
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        // Update user data
        user.userName = userName;
        if (email) {
          user.email = email;
        }
        if (picturePath !== undefined) {
          user.picturePath = picturePath;
        }
        await user.save();
        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
};

export const addNews = async(req,res)=>{
 try {
    const {userId,heading,content,picturePath} = req.body;
    const newNews = new News({userId,heading,content,picturePath});
    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
 } catch (error) {
    res.status(500).json({ error:error.message}); 
 }
 


}