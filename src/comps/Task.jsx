import { useState } from "react"
import TaskSettings from "./TaskSettings"

function Task({ id, name, completed, memo, toggleCompleted, editTask, removeTask }){
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    return (
        <div className="flex items-center justify-between mt-4">
            <div className="flex gap-4">
                <input checked={completed} 
                onChange={e => toggleCompleted(id, e.target.checked)} 
                type="checkbox" 
                id={id} 
                name="task-complete"
                className="task-checkbox scale-125" />

                <p className="task-name text-sm text-gray-200 w-48 text-ellipsis overflow-hidden whitespace-nowrap" title={name}>{name}</p>
            </div>
            <i onClick={() => setIsSettingsOpen(true)} className="fa-solid fa-ellipsis mr-2 text-gray-300 cursor-pointer"></i>

            <TaskSettings id={id}
            completed={completed}
            name={name}
            memo={memo}
            isSettingsOpen={isSettingsOpen}
            setIsSettingsOpen={setIsSettingsOpen}
            editTask={editTask}
            removeTask={removeTask} />
        </div>
    )
}

export default Task