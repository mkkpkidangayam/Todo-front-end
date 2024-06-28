import React, { useState } from "react";
import { Axios } from "../App";

const AddTask = () => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/add-task", { task: input });
      const { message } = response.data;
      console.log(message);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new task"
          />
          <button>Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
