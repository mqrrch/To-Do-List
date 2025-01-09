import { useEffect, useState } from "react";
import AddTask from "./comps/AddTask";
import TaskList from "./comps/TaskList";

function App() {
  const date = new Date();
  const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fullDate = `${month}-${day}-${year}`;

  const [taskList, setTaskList] = useState(() => {
    const localValue = localStorage.getItem("TASKS");
    if (localValue === null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("TASKS", JSON.stringify(taskList));
  }, [taskList]);

  const addTask = (name) => {
    setTaskList((currentList) => {
      return [...currentList, {
        id: crypto.randomUUID(),
        name,
        completed: false,
        memo: ''
      }];
    });
  };

  const editTask = (id, newName, newMemo) => {
    setTaskList((currentList) => {
      return currentList.map(task => {
        if (task.id === id){
          return {...task, name: newName, memo: newMemo};
        };
        return task;
      });
    });
  };

  const removeTask = (id) => {
    setTaskList((currentList) => {
      return currentList.filter(task => task.id !== id);
    });
  };

  const removeAllTask = () => {
    setTaskList([]);
  }

  const toggleCompleted = (id, completed) => {
    setTaskList((currentList) => {
      return currentList.map(task => {
        if (task.id === id){
          return {...task, completed};
        };
        return task;
      });
    });
  };

  return (
    <div className="to-do-list-container bg-slate-700 w-screen h-screen p-5">
      <div className="">
        <p className="text-center text-3xl text-gray-300">{dayName}</p>
        <p className="text-center text-xl mt-1 text-gray-400">{fullDate}</p>
      </div>

      <AddTask addTask={addTask} />
      <TaskList taskList={taskList} 
      toggleCompleted={toggleCompleted}
      editTask={editTask}
      removeTask={removeTask}
      removeAllTask={removeAllTask} />
    </div>
  );
};

export default App;
