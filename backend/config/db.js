const mongoose = require("mongoose");
const processor = process.env
const connectDB = async () => {
  try {
    await mongoose.connect(processor.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("type: ",typeof(processor.MONGO_URI))
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

connectDB();
module.exports = mongoose;
