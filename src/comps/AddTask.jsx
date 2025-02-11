import { useState } from "react"

function AddTask({ newTodo, setNewTodo, addTask }){
    const handleSubmit = (e) => {
        e.preventDefault()

        addTask()
        setNewTodo("")
    }

    return (
        <form id="add-task-form" className="mt-3 flex gap-4" onSubmit={handleSubmit}>
            <input name="task-name"
            id="task-name"
            placeholder="Add task..."
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            className="py-1 pl-3 w-full border-2 border-slate-500 rounded-lg" />
            <button type="submit" className="bg-green-500 rounded-xl p-2 px-6 text-white">Add</button>
        </form>
    )
}

export default AddTask