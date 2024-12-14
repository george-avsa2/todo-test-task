import React, { Dispatch, FC, useEffect, useMemo, useState } from "react";
import { filterColors, FilterOption, ITask, TaskStatuses } from "./../App";
import { Task } from "./Task";

interface ITaskListProps {
  active: FilterOption;
  tasks: ITask[];
  setTasks: Dispatch<(tasks: any) => ITask[] | ITask[]>;
}

const changeStatusCallback = (
  tasks: ITask[],
  taskId: string,
  status: TaskStatuses
): ITask[] => {
  return tasks.map((task) => (task.id === taskId ? { ...task, status } : task));
};

export const TaskList: FC<ITaskListProps> = ({ active, tasks, setTasks }) => {
  const handleActionTask = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLElement) {
      const elementClass = e.target.className;
      const taskId = e.currentTarget.id;

      switch (elementClass) {
        case "task__button--pending":
          setTasks((tasks) => {
            return changeStatusCallback(tasks, taskId, TaskStatuses.PENDING);
          });
          break;
        case "task__button--cancel":
          setTasks((tasks) =>
            changeStatusCallback(tasks, taskId, TaskStatuses.CANCELED)
          );
          break;
        case "task__button--done":
          setTasks((tasks) =>
            changeStatusCallback(tasks, taskId, TaskStatuses.DONE)
          );
          break;
        case "task__button--delete":
          setTasks((tasks) =>
            tasks.filter((task: ITask) => task.id !== taskId)
          );
          break;
        default:
          console.log("Do nothing)");
      }
    }
  };

  const filteredValues = useMemo<ITask[]>(() => {
    if (active === "all") {
      return tasks;
    }
    return tasks.filter((task) => task.status === active);
  }, [active, tasks]);

  return (
    <div className="task-list">
      {filteredValues.map((task) => (
        <Task task={task} handleActionTask={handleActionTask} />
      ))}
    </div>
  );
};
