const mongoose = require('mongoose');
const MAX_RETRIES = 3;

let retries = 0;

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hospital_appointments';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ MongoDB connected');
    return mongoose.connection;
  } catch (error) {
    retries++;
    
    if (retries < MAX_RETRIES) {
      console.log(`✗ Connection failed. Retrying (${retries}/${MAX_RETRIES})...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return connectDB();
    }

    console.error('✗ MongoDB connection failed after retries:', error.message);
    return null;
  }
};

module.exports = connectDB;
