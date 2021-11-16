import React, { useState } from "react";
import delete_icon from "./../../assets/icons/delete_icon.png";

export default function TodoItem({
  element,
  handleDeleteTask,
  handleUpdateTask,
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [task, setTask] = useState(element.task);
  return isEditable ? (
    <input
      value={task}
      onKeyDown={() => {}}
      className='tasks_items_input'
      onKeyPress={(key) => {
        if (key.key === "Enter" && task) {
          handleUpdateTask(element._id, task);
          setIsEditable(false);
        }
      }}
      onChange={(evt) => setTask(evt.target.value)}
      required
      minLength={1}
    />
  ) : (
    <li className='tasks_items' onClick={() => setIsEditable(true)}>
      {element.task}
      <img
        src={delete_icon}
        className='delete_icon'
        alt='delete button'
        onClick={() => handleDeleteTask(element._id)}
      />
    </li>
  );
}
