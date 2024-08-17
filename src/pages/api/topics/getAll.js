import dbConnect from "@/middleware/mongoose";
import Topic from '@/models/topicModel';

const getAllTopics = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const topics = await Topic.find({});

      return res.status(200).json({ success: true, data: topics });
    } catch (error) {
      console.error('Error fetching topics:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to fetch topics', error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};

export default dbConnect(getAllTopics);

