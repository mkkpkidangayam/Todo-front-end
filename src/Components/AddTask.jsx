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
    <div className="flex flex-col items-center border-b-2 pb-4">
      <h2 className="m-2 text-2xl font-bold">ToDo List</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border-2 border-black rounded p-1"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new task"
        />
        <button
          className="mx-1 bg-blue-700 text-white p-1 rounded font-medium hover:bg-blue-600 cursor-pointer"
          disabled={input === ""}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
