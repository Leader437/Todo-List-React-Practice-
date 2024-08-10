import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const TaskPlate = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let checkAvailable = localStorage.getItem("Todos");

    if (checkAvailable) {
      setTodos(JSON.parse(localStorage.getItem("Todos")));
    }
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo.trim() != "") {
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(newTodos);
      localStorage.setItem("Todos", JSON.stringify(newTodos));
      setTodo("");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleRadio = (e) => {
    const targetId = e.target.name;

    const updatedTodos = todos.map((todo) => {
      if (todo.id === targetId) {
        return { ...todo, isCompleted: e.target.checked };
      }
      return todo;
    });

    setTodos(updatedTodos);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
  };

  const handleEdit = (toBeEditedID) => {
    let targetIndex = todos.findIndex((i) => i.id === toBeEditedID);

    setTodo(todos[targetIndex].todo);

    let newTodos = todos.filter((i) => i.id != toBeEditedID);
    setTodos(newTodos);
    
    localStorage.setItem("Todos", JSON.stringify(newTodos));
  };

  const handleDelete = (toBeDeletedID) => {
    let newTodos = todos.filter((i) => i.id != toBeDeletedID);
    setTodos(newTodos);

    localStorage.setItem("Todos", JSON.stringify(newTodos));
  };

  return (
    <div className="container mt-8 relative">
      <div className="shadow-lg bg-white min-h-[60vh]">
        {todos.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-5 border-b-[1px] border-solid border-slate-600 py-4 px-6"
            >
              <input
                type="checkbox"
                className="cursor-pointer"
                name={item.id}
                checked={item.isCompleted}
                onChange={handleRadio}
              />
              <p className={item.isCompleted ? "line-through" : ""}>
                {item.todo}
              </p>
              <button
                className="ml-auto bg-violet-600 hover:bg-violet-800 text-white font-semibold px-4 py-2 rounded-xl"
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </button>
              <button
                className="bg-violet-600 hover:bg-violet-800 text-white font-semibold px-4 py-2 rounded-xl"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div className="rounded-3xl absolute top-full left-[50%] -translate-x-[50%] -translate-y-6 overflow-hidden shadow-lg flex">
        <input
          type="text"
          name="task"
          value={todo}
          className="pl-4 py-2 outline-none bg-violet-100"
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
        <button
          className="bg-violet-600 hover:bg-violet-800 text-white font-semibold px-6 py-2"
          onClick={handleAdd}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TaskPlate;