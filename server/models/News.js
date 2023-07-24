import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    content: {
      type: String,
      required: true,
      min: 2,
    },
    picturePath: {
      type: String,
      default: "",
    },
    userId: {
      type: String, 
      // No longer requiring the userId to be unique
    },
  },
  { timestamps: true }
);

const News = mongoose.model("News", NewsSchema);
export default News;
