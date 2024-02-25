import mongoose from "mongoose";
const connectDB = async () => {
  mongoose
    .connect("mongodb://localhost:27017/threads")
    .then(() => {
      console.log("connected to mongo db");
    })
    .catch((err) => {
      console.log(err);
    });
};
export default connectDB;
