import { useState } from "react"
import Task from "./Task"

function TaskList({ todos, removeTask, editTask, toggleCompleted, removeAllTask }){
    const [sortBy, setSortBy] = useState('');

    const sortedTask = [...todos].sort((a, b) => {
        if(sortBy === 'not-completed'){
            return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;    
        }
        if(sortBy === 'completed'){
            return (a.completed === b.completed) ? 0 : a.completed ? -1 : 1;    
        }
    })

    return(
        <>
            <div className="flex justify-between mt-4">
                <select id="sort-by" name="sort-by" value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="rounded">
                    <option value='' disabled>Sort by</option>
                    <option value='none'>None</option>
                    <option value='not-completed'>Not Completed</option>
                    <option value='completed'>Completed</option>
                </select>
                <button id="remove-all" onClick={() => removeAllTask()} className="text-gray-200 hover:text-red-400 cursor-pointer transition-colors">
                    Remove All
                </button>
            </div>
            <div className="h-[240px] overflow-auto mt-3">
                {sortBy !== 'none' ? (
                    <div className="">
                        {sortedTask.map((t) => (
                            <Task {...t}
                            key={t.id}
                            toggleCompleted={toggleCompleted}
                            editTask={editTask}
                            removeTask={removeTask} />
                        ))}
                    </div>
                ) : (
                    <div className="">
                        {todos.map((t) => (
                            <Task {...t}
                            key={t.id}
                            toggleCompleted={toggleCompleted}
                            editTask={editTask}
                            removeTask={removeTask} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default TaskList