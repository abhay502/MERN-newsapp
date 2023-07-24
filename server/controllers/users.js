import User from "../models/User.js";
import News from "../models/News.js";
//READ
export const getUser = async(req,res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}     

export const getNews = async (req, res) => {
  try {
    const news = await News.find()
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .populate('userId', 'userName'); // Use populate to include the userName from the User collection

    // Extract all unique user IDs from the news array
    const userIds = news.map((eachNews) => eachNews.userId);

    // Find all users whose _id is in the userIds array
    const publishers = await User.find({ _id: { $in: userIds } });

    // Map each news item to include the associated userName
    const newsWithPublisherNames = news.map((eachNews) => {
      const publisher = publishers.find((user) => user._id.equals(eachNews.userId));
      return {
        ...eachNews._doc,
        userName: publisher ? publisher.userName : null,
      };
    });

    console.log(newsWithPublisherNames);
    res.status(200).json(newsWithPublisherNames);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

  