import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        userName:{
            type:String,
            require:true,
            min:2,
            max:50
        },
        email:{
            type:String,
            require:true,
            unique:true,
            max:50
        },
        password:{
            type:String,
            require:true,
            min:5,
        },
        picturePath:{
            type:String,
            default:""
        },

    },{timestamps:true}
);

const User = mongoose.model("User", UserSchema);
export default User;

 