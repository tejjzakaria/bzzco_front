import mongoose from "mongoose";

declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bzzco";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
} = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) {
    global.mongooseCache = cached;
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
