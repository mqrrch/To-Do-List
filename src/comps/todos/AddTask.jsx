function AddTask({ newTodo, setNewTodo, addTask }){
    const handleSubmit = (e) => {
        e.preventDefault()

        addTask()
        setNewTodo("")
    }

    return (
        <form id="add-task-form" className="mt-3 flex gap-2" onSubmit={handleSubmit}>
            <input name="task-name"
            id="task-name"
            placeholder="Add task..."
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            className="py-1 pl-3 w-full border-2 border-slate-500 rounded-lg" />
            <button type="submit" className="bg-green-500 border-2 border-green-600 rounded-lg p-2 px-6 lg:px-8 text-white font-[500] hover:bg-green-700 transition-colors">Add</button>
        </form>
    )
}

export default AddTask