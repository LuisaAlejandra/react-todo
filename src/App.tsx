import { type ErrorInfo, repo } from "remult";
import "./App.css";
import { Task } from "./shared/Task";
import { FormEvent, useEffect, useState } from "react";
import { TaskController } from "./shared/TasksController";

const taskRepo = repo(Task); //Conexión con el repositorio de tareas

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]); //State para almacenar los todos
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<ErrorInfo<Task>>();

  async function addTask(e: FormEvent) {
    e.preventDefault();
    try {
      await taskRepo.insert({ title: newTaskTitle });
      setNewTaskTitle("");
    } catch (error: any) {
      alert((error as { message: string }).message);
    }
  }

  async function setCompleted(task: Task, completed: boolean) {
    await taskRepo.update(task, { completed });
  }

  async function deleteTask(task: Task) {
    try {
      await taskRepo.delete(task);
    } catch (error: any) {
      alert((error as { message: string }).message);
    }
  }

  const setAllCompleted = async (completed: boolean) => {
    try {
      setError(undefined);
      await TaskController.setAllCompleted(completed);
    } catch (error) {
      setError(error as ErrorInfo<Task>);
    }
  };

  useEffect(() => {
    setError(undefined);
    return taskRepo
      .liveQuery({
        limit: 15,
        orderBy: { createdAt: "asc" },
      })
      .subscribe({
        next: (info) => setTasks(info.applyChanges),
        error: setError,
      });
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <main>
        <form onSubmit={addTask}>
          <input
            value={newTaskTitle}
            placeholder="What needs to be done?"
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button>Add</button>
        </form>
        {error && (
          <div>
            <strong style={{ color: "red" }}>Error: {error.message}</strong>
          </div>
        )}
        {tasks.map((task) => {
          return (
            <div key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => setCompleted(task, e.target.checked)}
              />
              {task.title}
              <button
                onClick={() => deleteTask(task)}
                style={{ marginLeft: "auto" }}
              >
                Delete
              </button>
            </div>
          );
        })}
        <div>
          <button onClick={() => setAllCompleted(true)}>
            Set All Completed
          </button>
          <button onClick={() => setAllCompleted(false)}>
            Set All Uncompleted
          </button>
        </div>
      </main>
    </div>
  );
}
