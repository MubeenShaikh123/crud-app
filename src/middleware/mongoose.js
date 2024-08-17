import mongoose from "mongoose";

const dbConnect = (handler) => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        console.log("win");
        return handler(req, res);
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("loss");
        return handler(req, res);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        return res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
}

export default dbConnect;
