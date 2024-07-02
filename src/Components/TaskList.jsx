import React, { useContext, useEffect, useState } from "react";
import { Axios, myContext } from "../App";

const TaskList = () => {
  const { isSubmit, setIsSubmit } = useContext(myContext);
  const [isloading, setIsLoading] = useState(true);
  const [tasks, settasks] = useState([]);

  useEffect(() => {
    Axios.get("/show-task")
      .then((response) => {
        settasks(response.data);
        setIsLoading(false);
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

  const updatetTask = (index) => {

  }

  if (isloading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="mx-5 flex flex-col items-center my-3">
      {/* <div>
        <h1 className="text-2xl font-bold border-b-2 border-blue-800">
          ToDo List
        </h1>
      </div> */}
      {tasks.length > 0 ? (
        <table className="w-11/12 my-3">
          <tr className="">
            <th className="text-left text-lg border border-black pl-2">No:</th>
            <th className="text-left text-lg border border-black pl-2 w-2/3">Task</th>
            <th className="text-left text-lg border border-black pl-2">Time</th>
            <th className="text-left text-lg border border-black pl-2">
              Actions
            </th>
          </tr>
          {tasks.map((todo, index) => (
            <tr key={todo._id}>
              <td className="pl-2 border border-black">{index + 1}</td>
              <td className="pl-2 border border-black">
                <div className="flex justify-between">
                  <span className="pt-1">{todo.task}</span>
                  <div>

                  <button className="rounded px-1 m-1 border border-black hover:underline ">
                    Completed
                  </button>
                  </div>
                </div>
              </td>
              <td className="pl-2 border border-black">
                {new Date(todo.createdAt).toLocaleString()}
              </td>
              <td className="pl-2 border border-black ">
                <div className="flex justify-around">
                  <button className="rounded px-1 m-1 border border-black hover:underline ">
                    Edit
                  </button>
                  <button
                    className="rounded px-1 m-1 border border-black hover:underline "
                    onClick={() => deleteTask(todo._id)}
                  >
                    Delete
                  </button>
                </div>
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
