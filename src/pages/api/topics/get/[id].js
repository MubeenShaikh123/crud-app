import dbConnect from "@/middleware/mongoose";
import Topic from '@/models/topicModel';

const getOneTopic = async (req, res) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const topic = await Topic.findById(id);

      if (!topic) {
        return res.status(404).json({ success: false, message: 'Topic not found' });
      }

      return res.status(200).json({ success: true, data: topic });
    } catch (error) {
      console.error('Error fetching topic:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to fetch topic', error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};

export default dbConnect(getOneTopic);
