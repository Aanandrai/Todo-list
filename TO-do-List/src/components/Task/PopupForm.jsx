import { useState } from 'react';
import './popup.css';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const PopupForm = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/task/createTask", {
      title,
      description
    }).then((response) => {
      if (response.data.success == true) {
        console.log(response.data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    const taskData = { title, description };
    onSubmit(taskData);
    setTitle('');
    setDescription('');
    togglePopup();
  };


  return (
    <>
      <button className="btn-open-popup" onClick={togglePopup}>
        Add Task
      </button>
      {isOpen && (
        <div className="overlay-container">
          <div className="popup-box">
            <h2>Task Details</h2>
            <form className="form-container" onSubmit={handleSubmit}>
              <label className="form-label" htmlFor="taskName">
                Task Name:
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="Enter Task Name"
                id="taskName"
                name="taskName"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className="form-label" htmlFor="description">
                Description:
              </label>
              <textarea
                className="form-input"
                placeholder="Enter Description"
                id="description"
                name="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="buttons-popup">
                <button className="btn-submit" type="submit">
                  Submit
                </button>
                <button className="btn-close-popup" onClick={togglePopup}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupForm;
