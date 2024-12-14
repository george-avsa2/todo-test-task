import { FC } from "react";
import { filterColors, ITask } from "./../App";

interface ITaskProps {
  task: ITask;
  handleActionTask: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Task: FC<ITaskProps> = ({ task, handleActionTask }) => {
  return (
    <div className="task" key={task.id} id={task.id} onClick={handleActionTask}>
      <div className="task__info">
        <div
          className="task__cirlcle"
          style={{ backgroundColor: filterColors[task.status] }}
        />
        {task.text}
      </div>
      <div className="task_buttons">
        <button className="task__button--pending">В работе</button>
        <button className="task__button--cancel">Отменить</button>
        <button className="task__button--done">Готово</button>
        <button className="task__button--delete">Удалить</button>
      </div>
    </div>
  );
};
