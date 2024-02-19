import axios from "axios";
import { useEffect, useState } from "react";
export default function Todos({ token }) {
  const [todos, setTodos] = useState(["no data"]);
  useEffect(() => {
    if (token) {
      const response = fetchTodos(token);
    }
  }, [token]);
  const fetchTodos = async (token) => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3000/api/todos",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.data.todos) {
        setTodos(response.data.todos);
      }
    } catch (e) {
      console.log("message: ", e);
    }
  };
  return (
    <div>
      <h1>List of todos</h1>
      {todos.map((todo) => (
        <li key={todo.title}>{todo.title}</li>
      ))}
    </div>
  );
}
