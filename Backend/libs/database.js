import mongoose from 'mongoose';
import config from '../config.js';

export const connectDB = async () => {
    await mongoose.connect(config.mongoURL);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Connected to DB');
    });
    db.on('disconnected', function() {
        console.log('Disconnected from DB');
    });
}
