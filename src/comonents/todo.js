import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./todo.css";
const Todo = () => {
  const [todo, setTodo] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    console.log("hello");
    const token = window.localStorage.getItem("token");
    const config = {
      headers: {
        authorization: token
      },
    };
    axios.get("https://todo-app-f9m2.onrender.com/todo", config).then((res) => {
      setTodo(res.data.activities);
    });
  }, []);
  console.log(todo);
  const LogOutHandler = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };
  
  return (
    <div className="todo-container">
      <div className="header">
        <h3>username</h3>
      </div>
      <div className="nav-bar">
        <div>
          <h2>Todo List</h2>
          <h2>History</h2>
        </div>
        <div>
          <button onClick={LogOutHandler}>Log Out</button>
        </div>
      </div>
      <div className="table">
        <div className="new">
          <Link to="/create">
            <span>+New ACtivity</span>
          </Link>
        </div>
        <table>
            <tr>
              <th>ACtivity</th>
              <th>Status</th>
              <th>Time Take</th>
              <th>Action</th>
            </tr>
          {todo.map((item, i) => {
            return (
                <tr key={i}>
                  <td>{item.activity}</td>
                  <td>{item.status}</td>
                  <td></td>
                  <td>start</td>
                </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
export default Todo;
