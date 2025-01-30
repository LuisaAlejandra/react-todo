import {Allow, BackendMethod, remult } from "remult";
import { Task } from "./Task";

export class TaskController {
  @BackendMethod({ allowed: Allow.authenticated }) //El decorador le indica a Remult que exponga un método como endpoint
  static async setAllCompleted(completed: boolean) {
    const taskRepo = remult.repo(Task);

    for (const task of await taskRepo.find()) {
      await taskRepo.save({ ...task, completed });
    }
  }
}
