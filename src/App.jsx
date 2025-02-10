import { useEffect, useState } from "react";
import ToDolist from "./ToDoList";
import './App.css'

function App() {
  const [taskList, setTaskList] = useState(() => {
    const localValue = localStorage.getItem("TASKS");
    if (localValue === null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("TASKS", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div id="app-bg" className="fixed top-0 left-0 w-full h-screen z-[-2] bg-blue-500"></div>
      <ToDolist taskList={taskList} setTaskList={setTaskList} />
    </div>
  );
};

export default App;
