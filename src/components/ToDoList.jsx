import React, { useState } from "react";
import {
  FaRegEdit,
  FaArrowAltCircleUp,
  FaArrowAltCircleDown,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function ToDoList() {
  const [tasks, setTasks] = useState([
    { text: "買飲料", completed: false },
    { text: "健身房", completed: false },
    { text: "遛狗", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "" && editIndex === null) {
      setTasks((t) => [...t, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function editTask(index) {
    setEditIndex(index);
    setNewTask(tasks[index].text);
  }

  function saveEditedTask() {
    if (editIndex !== null && newTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = newTask;
      setTasks(updatedTasks);
      setNewTask("");
      setEditIndex(null);
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function toggleTaskCompletion(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <>
      <div className="to-do-list">
        <h1>To-Do-List</h1>
        <div>
          <input
            type="text"
            placeholder="輸入備忘事項..."
            value={newTask}
            onChange={handleInputChange}
          />
          <button
            className="add-button"
            onClick={editIndex === null ? addTask : saveEditedTask}
          >
            {editIndex === null ? "Add" : "Save"}
          </button>
        </div>
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
              />
              <span className={`text ${task.completed ? "completed" : ""}`}>
                {task.text}
              </span>
              <FaRegEdit
                className="edit-button"
                onClick={() => editTask(index)}
              />
              <MdDelete
                className="delete-button"
                onClick={() => deleteTask(index)}
              />
              <FaArrowAltCircleUp
                className="move-button"
                onClick={() => moveTaskUp(index)}
              />
              <FaArrowAltCircleDown
                className="move-button"
                onClick={() => moveTaskDown(index)}
              />
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
