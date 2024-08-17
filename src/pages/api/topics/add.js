import dbConnect from "@/middleware/mongoose";
import Topic from '@/models/topicModel';

const addTopic = async (req, res) => {
  if (req.method === 'POST') {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are mandatory' });
    }

    try {
      const newTopic = new Topic({ title, description });
      await newTopic.save();

      return res.status(201).json({ success: true, message: 'Topic added successfully', data: newTopic });
    } catch (error) {
      console.error('Error adding topic:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to add topic', error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};

export default dbConnect(addTopic);
