import React, { useEffect, useState } from "react";
import { TaskInput } from "./components/TaskInput";
import { Select } from "./components/Select";
import { TaskList } from "Components/TaskList";
import { v4 as uuidv4 } from "uuid";

export enum TaskStatuses {
  PENDING = "pending",
  CANCELED = "canceled",
  DONE = "done",
}

export type FilterOption = "all" | TaskStatuses;

export const filterOptions: FilterOption[] = [
  "all",
  TaskStatuses.CANCELED,
  TaskStatuses.DONE,
  TaskStatuses.PENDING,
];

export const filterColors: Record<TaskStatuses, string> = {
  [TaskStatuses.CANCELED]: "red",
  [TaskStatuses.DONE]: "green",
  [TaskStatuses.PENDING]: "yellow",
};

export interface ITask {
  id: string;
  status: TaskStatuses;
  text: string;
}

export const App = () => {
  const [inputValue, setInputValue] = useState("");

  const [active, setActive] = useState(filterOptions[0]);

  const [tasks, setTasks] = useState<ITask[]>(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        return JSON.parse(savedTasks) as ITask[];
      } else {
        throw new Error();
      }
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateButton = () => {
    setTasks((tasks) => [
      ...tasks,
      { id: uuidv4(), status: TaskStatuses.PENDING, text: inputValue },
    ]);
    setInputValue("");
  };

  return (
    <div className="wrapper">
      <div className="wrapper__filters">
        <Select active={active} setActive={setActive} options={filterOptions} />
        <div className="wrapper__creation-form">
          <TaskInput inputValue={inputValue} setInputValue={setInputValue} />
          <input type="submit" value="Создать" onClick={handleCreateButton} />
        </div>
      </div>
      <TaskList active={active} tasks={tasks} setTasks={setTasks} />
    </div>
  );
};
