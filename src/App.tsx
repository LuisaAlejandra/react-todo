import { type ErrorInfo, repo } from "remult";
import "./App.css";
import { Task } from "./shared/Task";
import { FormEvent, useEffect, useState } from "react";
import { TaskController } from "./shared/TasksController";

const taskRepo = repo(Task); //Conexión con el repositorio de tareas

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<ErrorInfo<Task>>();

  const addTask = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newTask = await taskRepo.insert({ title: newTaskTitle });
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    } catch (error: unknown) {
      alert((error as { message: string }).message);
    }
  };

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
        next: (info) => {
          console.log("Datos:", info);
          setTasks(info.applyChanges);
        },
        error: (error) => {
          console.error("Error en liveQuery: ", error);
          setError(error as ErrorInfo<Task>);
        },
      });
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <main>
        {taskRepo.metadata.apiInsertAllowed() && (
          <form onSubmit={addTask}>
            <input
              value={newTaskTitle}
              placeholder="What needs to be done?"
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <button>Add</button>
          </form>
        )}
        {error && (
          <div>
            <strong style={{ color: "red" }}>Error: {error.message}</strong>
          </div>
        )}
        {tasks.map((task) => {
          const setTask = (value: Task) =>
            setTasks((tasks) => tasks.map((t) => (t === task ? value : t)));

          const setCompleted = async (completed: boolean) =>
            setTask(await taskRepo.save({ ...task, completed }));

          const setTitle = (title: string) => setTask({ ...task, title });

          const saveTask = async () => {
            try {
              setTask(await taskRepo.save(task));
            } catch (error: unknown) {
              alert((error as { message: string }).message);
            }
          };
          return (
            <div key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <input value={task.title} onChange={e=> setTitle(e.target.value)} />
              <button onClick={() => saveTask()}>Save</button>
              {taskRepo.metadata.apiDeleteAllowed(task) && (
                <button
                  onClick={() => deleteTask(task)}
                  style={{ marginLeft: "auto" }}
                >
                  Delete
                </button>
              )}
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
