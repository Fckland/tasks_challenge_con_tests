const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CASA, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  disconnectDB,
};
