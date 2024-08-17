import dbConnect from "@/middleware/mongoose";
import Topic from '@/models/topicModel';

const deleteTopic = async (req, res) => {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const deletedTopic = await Topic.findByIdAndDelete(id);

      if (!deletedTopic) {
        return res.status(404).json({ success: false, message: 'Topic not found' });
      }

      return res.status(200).json({ success: true, message: 'Topic deleted successfully' });
    } catch (error) {
      console.error('Error deleting topic:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to delete topic', error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};

export default dbConnect(deleteTopic);
