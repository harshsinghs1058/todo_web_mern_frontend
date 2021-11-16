import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth_context";
import "./todos.css";
import TodoItem from "./todoItem";
//main default function
export default function Todos() {
  const [auth, userSignOut] = useAuth(useAuth);
  const { userID } = useParams();
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [todos, setTodos] = useState([]);

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
      try {
        await axios.post(process.env.REACT_APP_URL + "todo/addTask", {
          task: newTask,
          email: auth.email,
        });
        const Todos = await getTodo();
        setTodos(Todos);
        setNewTask("");
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

  //jsx for user is not logged in
  if (!auth.isSignedIn || userID !== auth.email) {
    return (
      <div>
        <h1> ERROR 404</h1>
        <h2>
          You are not authorized access this page ,if you think this is a
          mistake then sign-in again.
        </h2>
      </div>
    );
  }

  return (
    <div id='todo_page'>
      <nav id='nav_bar'>
        <li id='title'>TodoApp</li>
        <div>
          <li>{auth.email}</li>
          <button id='sign_out' onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </nav>
      <div id='container'>
        <div id='todo_list'>
          <h1>Todo List</h1>
        </div>
        <div id='container2'>
          <div className='container3'>
            <input
              type='text'
              id='new_todo_item'
              placeholder='New task'
              value={newTask}
              onChange={(evt) => setNewTask(evt.target.value)}
              autoFocus
            />
            <button id='add_new_task_btn' onClick={handleAddNewTask}>
              Add Task
            </button>
            {validationError && (
              <div className='error'>New Task Is Required</div>
            )}
          </div>
          <div className='container3'>
            <ul id='myList'>
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
                <h1 id='todo_is_empty'> Todo Is Empty</h1>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
