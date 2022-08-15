import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./mongodb";
dotenv.config();

global.__COUNTER__ = 3_500_000_000_000;

const port = process.env.PORT || 3000;

(async () => {
  await connectDB(process.env.MONGO_URI!);
  console.log("[LOG]: connected to mongoDB");
  app.listen(port, () => {
    console.log(`[LOG]: server running at port ${port}`);
  });
})();
