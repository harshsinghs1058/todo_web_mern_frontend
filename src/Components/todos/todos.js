import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth_context";
import "./todos.css";
import loading_gif from "./../../assets/gif/loading_gif.gif";
import TodoItem from "./todoItem";
//main default function
export default function Todos() {
  const [auth, userSignOut] = useAuth(useAuth);
  const { userID } = useParams();
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [todos, setTodos] = useState("loading");
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(window.screen.availWidth);

  //on resize
  window.addEventListener("resize", () => setWidth(window.screen.availWidth));

  useEffect(() => {
    let mounted = true;
    getTodo().then((items) => {
      if (mounted) {
        setTodos(items);
      }
    });
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = () => {
    localStorage.setItem(
      "authTodo",
      JSON.stringify({
        isSignedIn: false,
        email: "",
      })
    );
    userSignOut();
    navigate("/sign-in");
  };

  const handleAddNewTask = async () => {
    if (newTask.length < 1) {
      setValidationError(true);
    } else {
      setTodos("loading");
      try {
        setIsLoading(true);
        await axios.post(process.env.REACT_APP_URL + "todo/addTask", {
          task: newTask,
          email: auth.email,
        });
        const Todos = await getTodo();
        setTodos(Todos);
        setNewTask("");
        setIsLoading(false);
      } catch (err) {
        alert("An error has occurred Please refresh");
      }
    }
  };

  async function handleDeleteTask(taskId) {
    try {
      await axios.delete(process.env.REACT_APP_URL + "todo/deleteTask", {
        data: {
          email: auth.email,
          taskId: taskId,
        },
      });
      const Todos = await getTodo();
      setTodos(Todos);
    } catch (err) {
      alert("An error has occurred Please refresh");
    }
  }

  async function handleUpdateTask(taskId, task) {
    try {
      await axios.patch(process.env.REACT_APP_URL + "todo/updateTask", {
        data: {
          email: auth.email,
          taskId: taskId,
          task: task,
        },
      });
      const Todos = await getTodo();
      setTodos(Todos);
    } catch (err) {
      alert("An error has occurred Please refresh");
    }
  }

  const getTodo = async () => {
    const res = await axios.get(
      process.env.REACT_APP_URL + `todo/getTodos/${userID}`
    );
    return res.data;
  };

  return (
    <div id="todo_page">
      <nav id="nav_bar">
        <li id="title">TodoApp</li>
        <div>
          {width > 750 && <li>{auth.email}</li>}
          <button id="sign_out" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </nav>
      <div id="container">
        <div id="todo_list">
          <h1>Todo List</h1>
        </div>
        <div id="container2">
          <div className="container3">
            <input
              type="text"
              id="new_todo_item"
              placeholder="New task"
              value={newTask}
              onChange={(evt) => setNewTask(evt.target.value)}
              autoFocus
            />
            {isLoading ? (
              <img id="loading_gif" src={loading_gif} alt="loading gif" />
            ) : (
              <button id="add_new_task_btn" onClick={handleAddNewTask}>
                Add Task
              </button>
            )}
            {validationError && (
              <div className="error">New Task Is Required</div>
            )}
          </div>
          <div className="container3">
            {todos === "loading" ? (
              <img id="loading_gif" src={loading_gif} alt="loading gif" />
            ) : (
              <div id="myList">
                {todos.length > 0 ? (
                  todos.map((element) => {
                    return (
                      <TodoItem
                        element={element}
                        handleDeleteTask={handleDeleteTask}
                        key={element._id}
                        handleUpdateTask={handleUpdateTask}
                      />
                    );
                  })
                ) : (
                  <h1 id="todo_is_empty"> Todo Is Empty</h1>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
