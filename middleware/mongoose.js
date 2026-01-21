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

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// let cached = global.mongoose;
// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }
// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }
//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };
//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }
// export default dbConnect;
