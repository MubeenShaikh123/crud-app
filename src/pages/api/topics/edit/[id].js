import dbConnect from "@/middleware/mongoose";
import Topic from '@/models/topicModel';

const updateTopic = async (req, res) => {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are mandatory' });
    }

    try {
      const updatedTopic = await Topic.findByIdAndUpdate(
        id,
        { title, description },
        { new: true, runValidators: true }
      );

      if (!updatedTopic) {
        return res.status(404).json({ success: false, message: 'Topic not found' });
      }

      return res.status(200).json({ success: true, message: 'Topic updated successfully', data: updatedTopic });
    } catch (error) {
      console.error('Error updating topic:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to update topic', error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};

export default dbConnect(updateTopic);
