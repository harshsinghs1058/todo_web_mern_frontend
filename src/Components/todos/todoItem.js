import React, { useState } from "react";
import delete_icon from "./../../assets/icons/delete_icon.png";
import loading_gif from "./../../assets/gif/loading_gif.gif";
export default function TodoItem({
  element,
  handleDeleteTask,
  handleUpdateTask,
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [task, setTask] = useState(element.task);
  const [isLoading, setIsLoading] = useState(false);
  return isEditable ? (
    <div id="update_todo_container">
      <input
        value={task}
        onKeyDown={() => {}}
        className="tasks_items_input"
        onKeyPress={async (key) => {
          if (key.key === "Enter" && task) {
            setIsLoading(true);
            await handleUpdateTask(element._id, task);
            setIsEditable(false);
            setIsLoading(false);
          }
        }}
        onChange={(evt) => setTask(evt.target.value)}
        required
        minLength={1}
      />
      {isLoading && (
        <img
          src={loading_gif}
          id="loading_input"
          className="delete_icon"
          alt="delete button"
        />
      )}
    </div>
  ) : (
    <div className="tasks_items">
      <div onClick={() => setIsEditable(true)}>{element.task}</div>
      <img
        src={isLoading ? loading_gif : delete_icon}
        className="delete_icon"
        alt="delete button"
        onClick={() => {
          setIsLoading(true);
          handleDeleteTask(element._id);
        }}
      />
    </div>
  );
}
