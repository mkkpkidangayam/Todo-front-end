import React, { useContext, useState } from "react";
import { Axios, myContext } from "../App";
import TaskList from "./TaskList";

const AddTask = () => {
  const [input, setInput] = useState("");
  const { setIsSubmit } = useContext(myContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/add-task", { task: input });
      const { message } = response.data;
      setIsSubmit(true);
      console.log(message);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl ">Add Task</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="border-2 "
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new task"
          />
          <button disabled={input === ""}>Add Task</button>
        </form>
      </div>
      <TaskList />
    </div>
  );
};

export default AddTask;
