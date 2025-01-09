import { useState } from "react"

function AddTask({ addTask }){
    const [name, setName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        addTask(name)
        setName('')
    }

    return (
        <form className="mt-5" onSubmit={handleSubmit}>
            <i className="add-task-icon fa-solid fa-bars-staggered absolute text-slate-700"></i>

            <input name="task-name" 
            id="task-name" 
            placeholder="Add task..."
            value={name}
            onChange={e => setName(e.target.value)} 
            className="py-1 pl-8 w-full border-2 border-slate-500 rounded-lg" />
        </form>
    )
}

export default AddTask