import React, {  useEffect, useState } from "react";
import { Axios } from "../App";

const TaskList = () => {
  // const { tasks, settasks } = useContext(myContext);
  const [tasks, settasks] = useState([])

  useEffect(() => {
    Axios.get("/show-task")
      .then((response) => {
        settasks(response.data);
      })
      .catch((error) => {
        console.error("Task getting error", error);
      });
  });
  return (
    <div>
      <div>
        <h1>ToDo List</h1>
      </div>
      <ul>
        {tasks.map((todo) => (
          <li key={todo._id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
