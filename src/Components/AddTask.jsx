import React, { useContext, useState } from "react";
import { Axios, myContext } from "../App";
import TaskList from "./TaskList";

const AddTask = () => {
  const [input, setInput] = useState("");
const {tasks, settasks } = useContext(myContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/add-task", { task: input });
      const { message, task } = response.data;
      settasks([...task, task])
      console.log(message);
      console.log(task);
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
      <TaskList />
    </div>
  );
};

export default AddTask;
