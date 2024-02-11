import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
interface Todo {
  id: number;
  userId: number;
  oldTitle: string;
  oldCompleted: boolean;
}

const Todo: FC = () => {
  const { todoId } = useParams();
  const [todo, setTodo] = useState({
    id: 0,
    userId: 0,
    title: "",
    completed: false,
  });
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      if (loading) {
        return;
      } else {
        setLoading(true);
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${todoId} `
          );
          const data = await response.json();
          setTodo(data);
        } catch (error) {
          console.error("Error fetching todo:", error);
        }
      }
    };
    fetchTodo();
    setLoading(false);
  }, [todoId, loading]);

  useEffect(() => {
    if (todo) {
      setId(todo.id);
      setUserId(todo.userId);
      setTitle(todo.title);
      setCompleted(todo.completed);
    }
  }, [todo]);

  function handleChangeLable(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleChangeCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    setCompleted(e.target.checked);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const updatedTodo = {
      id: id,
      userId: userId,
      title: title,
      completed: completed,
    };

    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
      method: "PATCH",
      body: JSON.stringify(updatedTodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTodo(json);
        setEditing(false);
      });
  }
  function handleEdit() {
    setEditing(true);
  }

  let editingTemplate = (
    <div className="todo-container">
      <form
        className="stack-small"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <div className="name-edit">
            <label
              htmlFor="editing-todo-input"
              className="label"
            >
              Name:
            </label>
            <input
              id="editing-todo-input"
              type="text"
              className="input_input__lg"
              value={title}
              onChange={handleChangeLable}
            />
          </div>
          <div className="compl-edit">
            <label
              htmlFor="editing-todo-input"
              className="label"
            >
              Completed ?
            </label>
            <div className="input_input_box">
              <input
                id="editing-todo-input"
                type="checkbox"
                className="input_input__lg"
                checked={completed}
                onChange={handleChangeCheckbox}
              />
            </div>
          </div>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn todo-cancel"
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn__primary btn__lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );

  let viewTemplate = (
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
            className={todo.completed ? "todo-completed" : "todo-notcompleted"}
          >
            <span className="h2-text">Status: </span>
            {todo.completed ? "Completed" : "Not completed"}
          </p>
        </div>
        <div className="todo-btns">
          <button
            className="todo-btn"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
          <button
            className="todo-btn"
            onClick={() => window.history.back()}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : editing ? (
        editingTemplate
      ) : (
        viewTemplate
      )}
    </>
  );
};

export default Todo;
