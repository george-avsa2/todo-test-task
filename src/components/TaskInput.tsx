import React, { FC } from "react";

interface ITaskInputProps {
  inputValue: string;
  setInputValue: React.Dispatch<string>;
}

export const TaskInput: FC<ITaskInputProps> = ({
  inputValue,
  setInputValue,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={onChange}
      placeholder="Напишите задачу"
    />
  );
};
