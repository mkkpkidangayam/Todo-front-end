import "./App.css";
import axios from "axios";
import TaskList from "./Components/TaskList";
import AddTask from "./Components/AddTask";
import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

export const Axios = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const myContext = createContext();

function App() {
  const [tasks, settasks] = useState([]);
  const details = {
    tasks,
    settasks
  }
  return (
    <div className="App">
      <myContext.Provider value={details} >
        {/* <Routes>
        <Route />
      </Routes> */}
        <AddTask />
        
      </myContext.Provider>
    </div>
  );
}

export default App;
