import { connect } from "mongoose";

export const connectDB = async (uri: string) => {
  try {
    await connect(uri);
  } catch (error) {
    console.log(`[ERROR] failed to connect to DB \n${error}`);
    process.exit(1);
  }
};
