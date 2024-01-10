require('dotenv').config();
import mongoose from 'mongoose';

// const connectDB = async () => {
//   const DATABASE_URI = process.env.MONGODB_URI as string

//   try {
//     await mongoose.connect(DATABASE_URI, {
//       dbName: process.env.MONGODB_DATABASE,
//       user: process.env.MONGODB_USER,
//       pass: process.env.MONGODB_PASSWORD,
//     })
//     logger.info('DB Connected')
//   } catch (error) {
//     console.log('Could not connect to db', error)
//     process.exit(1)
//   }
// }

const DATABASE_URI = process.env.MONGODB_URI as string;

if (!DATABASE_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env file',
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

// declare global
// @ts-ignore
let cached = global.mongoose;
if (!cached) {
    // @ts-ignore
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (!mongoose.connection.readyState) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose
            .connect(DATABASE_URI, opts)
            .then((mongoose) => {
                console.log('New Connection');
                return mongoose;
            });
    }

    if (mongoose.connection.readyState === 1) {
        console.log('Cache Connection');
        return mongoose;
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;
