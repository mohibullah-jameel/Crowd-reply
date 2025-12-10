import { Router } from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
} from "../controllers/tasks";

const router = Router();

router.route("/").post(createTask).get(getTasks);

router.route("/:id").get(getTask).put(updateTask);
export default router;
