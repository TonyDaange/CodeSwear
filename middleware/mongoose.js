import mongoose from "mongoose";

const connectDB = (handler) => {
  return async (req, res) => {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to MongoDB");
      return handler(req, res);
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    return handler(req, res);
  };
};
mongoose.models = {};

export default connectDB;
