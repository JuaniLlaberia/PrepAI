import mongoose, { Connection } from 'mongoose';

let cachedConnection: Connection | null = null;

export async function connectToDB() {
  if (cachedConnection) {
    console.log('Using cached db connection');
    return cachedConnection;
  }

  try {
    const cnx = await mongoose.connect(process.env.MONGODB_URL as string);
    cachedConnection = cnx.connection;

    console.log('A new db connection has been established');

    return cachedConnection;
  } catch (err) {
    throw err;
  }
}
