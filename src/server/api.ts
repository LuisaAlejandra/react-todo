import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/Task";
import { TaskController } from "../shared/TasksController";

export const api = remultExpress({
  entities: [Task],
  controllers: [TaskController],
  getUser: (req) => req.session!["user"]
});
