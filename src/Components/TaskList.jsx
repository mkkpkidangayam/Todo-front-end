import React, { useContext, useEffect, useState } from "react";
import { Axios, myContext } from "../App";

const TaskList = () => {
  const { isSubmit, setIsSubmit } = useContext(myContext);
  const [isloding, setIsLoding] = useState(true);
  const [tasks, settasks] = useState([]);

  useEffect(() => {
    Axios.get("/show-task")
      .then((response) => {
        settasks(response.data);
        setIsLoding(false);
        setIsSubmit(false);
      })
      .catch((error) => {
        console.error("Task getting error", error);
      });
  }, [isSubmit]);

  const deleteTask = async (taskId) => {
    try {
      const response = Axios.delete(`/delete-task/${taskId}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      settasks(updatedTasks);
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  if (isloding) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>ToDo List</h1>
      </div>
      {tasks.length > 0 ? (
        <table style={{ width: "100%" }}>
          <tr style={{ border: "2px solid black" }}>
            <th style={{ border: "2px solid black" }}>Task</th>
            <th style={{ border: "2px solid black" }}>Created At</th>
            <th style={{ border: "2px solid black" }}>Actions</th>
          </tr>
          {tasks.map((todo) => (
            <tr key={todo._id}>
              <td style={{ border: "2px solid black" }}>{todo.task}</td>
              <td style={{ border: "2px solid black" }}>
                {new Date(todo.createdAt).toLocaleString()}
              </td>
              <td style={{ border: "2px solid black" }}>
                <button>Edit</button>{" "}
                <button
                  className="bg-black"
                  onClick={() => deleteTask(todo._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <div>
          <h1>Tasks not added</h1>
        </div>
      )}
    </div>
  );
};

export default TaskList;
