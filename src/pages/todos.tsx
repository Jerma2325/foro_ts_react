import { FC, useEffect, useState } from "react";
import "./../styles/todos.css";
import { Link, useParams } from "react-router-dom";

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

  function checkToDo(id: number) {
    var response = fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  }
  function uncheckToDo(id: number) {
    var response = fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: false } : todo
      )
    );
  }

  function deleteToDo(id: number) {
    var response = fetch(`https://jsonplaceholder.typicode.com/todo/${id}`, {
      method: "DELETE",
    });
    document.querySelector(`.todo-container[data-id="${id}"]`)?.remove();
    console.log(response);
    alert("Todo deleted");
  }
  return (
    <>
      <div className="todos-list">
        {todos.map((todo) => (
          <div
            key={todo.id}
            data-id={todo.id}
            className="todo-container"
          >
            <div className="todo-content">
              <div className="todo-info">
                <h2 className="todo-title">
                  <span className="h2-text">Task:</span> {todo.title}
                </h2>
                <p
                  className={
                    todo.completed ? "todo-completed" : "todo-notcompleted"
                  }
                >
                  <span className="h2-text">Status: </span>
                  {todo.completed ? "Completed" : "Not completed"}
                </p>
              </div>
              <div className="todo-btns">
                <button className="todo-btn">
                  <Link to={`/todos/${todo.id}`}>Edit</Link>
                </button>

                <button
                  className="todo-btn"
                  onClick={() => deleteToDo(todo.id)}
                >
                  Delete
                </button>
                <button
                  className="todo-btn"
                  onClick={() => {
                    todo.completed ? uncheckToDo(todo.id) : checkToDo(todo.id);
                  }}
                >
                  {todo.completed ? "Uncheck" : "Check"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todos;
