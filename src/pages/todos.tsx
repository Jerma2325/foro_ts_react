import { FC, useEffect, useState } from "react";
import "./../styles/todos.css";
import { useParams } from "react-router-dom";

interface Todo {
  userid: number;
  id: number;
  title: string;
  completed: boolean;
}

const Todos: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { userId } = useParams();
  useEffect(() => {
    const fetchTodos = async () => {
      let response;
      try {
        if (!userId) {
          response = await fetch("https://jsonplaceholder.typicode.com/todos");
        } else {
          response = await fetch(
            `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
          );
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      <div className="todos-list">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="todo-container"
          >
            <div className="todo-content">
              <h2 className="todo-title">{todo.title}</h2>
              <p
                className={
                  todo.completed ? "todo-completed" : "todo-notcompleted"
                }
              >
                {todo.completed ? "Completed" : "Not completed"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todos;
