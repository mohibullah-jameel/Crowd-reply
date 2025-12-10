import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import { seedDefaultUser } from "./models";
import taskRoutes from "./routes/taskRoutes";
import statsRoutes from "./routes/statsRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "API is running..." });
});

app.use("/api/tasks", taskRoutes);
app.use("/api/stats", statsRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedDefaultUser();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
