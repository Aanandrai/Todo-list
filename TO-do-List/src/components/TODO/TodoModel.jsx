import { useState } from "react";
import PropTypes from "prop-types";
import "./Todomodel.css";
import axios from "axios";
 

const TodoModel = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/todo/createTodo")
    // Close the popup before handling submission
    if (task) {
      const Tododata = { task };
      onSubmit(Tododata);
      setTask("");
    }
    togglePopup();
  };



 

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleClear = () => {
    setIsOpen(false);
    setTask("");
  };

  return (
    <>
      <button className="AddTask-Button" onClick={togglePopup}>
        Add Task
      </button>
      {isOpen && (
        <div className="todo-card">
          <form className="add-task-form" onSubmit={handleSubmit}>
            <h2 className="add-task">Enter the Task</h2>
            <label htmlFor="taskname" className="task-label">
              Task Name
            </label>
            <input
              type="text"
              placeholder="Enter the Task"
              required
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="task-input"
            />
            <div className="button-container">
              <button  type="submit" className="submit-button">
                Ok
              </button>
              <button onClick={handleClear} className="delete-button">
                Clear
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

TodoModel.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TodoModel;
