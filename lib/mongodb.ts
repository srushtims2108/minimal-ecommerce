// lib/mongodb.ts
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/ecommerce';



if (!MONGODB_URI) {
  throw new Error('⚠️ Please define the MONGODB_URI environment variable');
}

interface MongooseGlobal {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const globalWithMongoose = global as typeof globalThis & {
  mongooseGlobal: MongooseGlobal;
};

if (!globalWithMongoose.mongooseGlobal) {
  globalWithMongoose.mongooseGlobal = {
    conn: null,
    promise: null,
  };
}

async function dbConnect(): Promise<Mongoose> {
  if (globalWithMongoose.mongooseGlobal.conn) {
    return globalWithMongoose.mongooseGlobal.conn;
  }

  if (!globalWithMongoose.mongooseGlobal.promise) {
    globalWithMongoose.mongooseGlobal.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'ecommerce',
    });
  }

  globalWithMongoose.mongooseGlobal.conn = await globalWithMongoose.mongooseGlobal.promise;
  console.log('✅ Connected to MongoDB');
  return globalWithMongoose.mongooseGlobal.conn;
}

export default dbConnect;
