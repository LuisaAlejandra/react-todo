import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/Task";
import { TaskController } from "../shared/TasksController";
import { repo } from "remult";
import { AuthController } from "../shared/AuthController";

export const api = remultExpress({
  entities: [Task],
  controllers: [TaskController, AuthController],
  getUser: (request) => request.session?.['user'],
  // initApi: async () => {
  //   const taskRepo = repo(Task)
  //   if ((await taskRepo.count()) == 0) {
  //       await taskRepo.insert([
  //         { title: 'Clean car' },
  //         { title: 'Read a book' },
  //         { title: 'Buy groceries', completed: true },
  //         { title: 'Do laundry' },
  //         { title: 'Cook dinner', completed: true },
  //         { title: 'Walk the dog' },
  //       ])
  //     }
  // }
});
