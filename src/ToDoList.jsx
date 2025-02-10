import { useEffect, useState } from "react";
import AddTask from "./comps/AddTask";
import TaskList from "./comps/TaskList";
import DateName from "./comps/DateName";

export default function ToDolist({ taskList, setTaskList }){
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
    };

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
        <div className="to-do-list-container bg-slate-700 flex flex-col justify-evenly w-full h-full max-w-[500px] max-h-[500px] [@media(min-width:500px)]:rounded-xl lg:max-w-[640px] xl:max-h-[520px] 2xl:max-w-[720px] 2xl:max-h-[640px] p-5">
            <DateName />
            <AddTask addTask={addTask} />
            <TaskList taskList={taskList} 
            toggleCompleted={toggleCompleted}
            editTask={editTask}
            removeTask={removeTask}
            removeAllTask={removeAllTask} />
        </div>
    )
}