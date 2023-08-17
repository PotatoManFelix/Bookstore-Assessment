const mongoose = require('mongoose');
require('dotenv').config();
const envVar = process.env;

exports.connectDB = async () => {
    try {
        await mongoose.connect(envVar.DB_URL);
        console.log('Database Connected');     
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}