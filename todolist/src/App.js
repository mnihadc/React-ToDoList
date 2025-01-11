import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const storedToDos = JSON.parse(localStorage.getItem("toDos"));
    if (storedToDos) {
      setToDos(storedToDos);
    }
  }, []);

  // Save tasks to localStorage whenever they update
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  // Function to handle adding a new to-do
  const addToDo = () => {
    if (toDo.trim() === "") {
      alert("Please enter a valid task!");
      return;
    }
    if (toDo.length > 50) {
      alert("Task is too long! Limit: 50 characters.");
      return;
    }
    setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
    setToDo(""); // Clear input field after adding
  };

  // Function to delete a specific to-do
  const deleteToDo = (id) => {
    setToDos(toDos.filter((obj) => obj.id !== id));
  };

  // Function to clear all completed tasks
  const clearCompleted = () => {
    setToDos(toDos.filter((obj) => !obj.status));
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>My To-Do List</h1>
      </div>
      <div className="subHeading">
        <h2>Stay Organized, Stay Productive 🌟</h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="Add a new task..."
          maxLength={50}
        />
        <button onClick={addToDo} className="add-btn">
          Add
        </button>
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div key={obj.id} className="todo">
              <div className="left">
                <input
                  onChange={(e) => {
                    setToDos(
                      toDos.map((obj1) => {
                        if (obj1.id === obj.id) {
                          obj1.status = e.target.checked;
                        }
                        return obj1;
                      })
                    );
                  }}
                  checked={obj.status}
                  type="checkbox"
                />
                <p
                  style={{
                    textDecoration: obj.status ? "line-through" : "none",
                  }}
                >
                  {obj.text}
                </p>
              </div>
              <div className="right">
                <button onClick={() => deleteToDo(obj.id)} className="delete-btn">
                  ✖
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer">
        <button onClick={clearCompleted} className="clear-btn">
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default App;
