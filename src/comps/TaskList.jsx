import { useState } from "react"
import Task from "./Task"

function TaskList({ taskList, toggleCompleted, editTask, removeTask, removeAllTask }){
    const [sortBy, setSortBy] = useState('');

    const sortedTask = [...taskList].sort((a, b) => {
        if(sortBy === 'not-completed'){
            return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;    
        }
        if(sortBy === 'completed'){
            return (a.completed === b.completed) ? 0 : a.completed ? -1 : 1;    
        }
    })

    return(
        <div className="mt-5 h-2/3 flex flex-col overflow-auto">
            <div className="flex justify-between">
                <select id="sort-by" name="sort-by" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value='' disabled>Sort by</option>
                    <option value='none'>None</option>
                    <option value='not-completed'>Not Completed</option>
                    <option value='completed'>Completed</option>
                </select>
                <p onClick={() => removeAllTask()} className="text-gray-200 hover:text-red-400 cursor-pointer">
                    Remove All
                </p>
            </div>
            {sortBy !== 'none' ? (
                <div className="px-1 flex-1">
                    {sortedTask.map((t, i) => (
                        <Task {...t}
                        key={i}
                        toggleCompleted={toggleCompleted}
                        editTask={editTask}
                        removeTask={removeTask} />
                    ))}
                </div>
            ) : (
                <div className="px-1 flex-1">
                    {taskList.map((t, i) => (
                        <Task {...t}
                        key={i}
                        toggleCompleted={toggleCompleted}
                        editTask={editTask}
                        removeTask={removeTask} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default TaskList