import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/minimal-ecommerce";

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable.");
}

// Augment the global object to avoid multiple connections in development
declare global {
  // Allow global `mongoose` variable for hot-reloading in dev
  var mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

let cached = global.mongooseConnection;

if (!cached) {
  cached = global.mongooseConnection = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
