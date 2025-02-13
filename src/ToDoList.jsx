import { useEffect, useState } from "react";
import AddTask from "./comps/AddTask";
import TaskList from "./comps/TaskList";
import DateName from "./comps/DateName";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import {
    collection,
    doc,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp, 
    writeBatch } from "firebase/firestore";

export default function ToDolist({ user }){
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        const q = query(
            collection(db, "todos"),
            where('uid', '==', user.uid),
            orderBy('createdAt', 'asc')
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todosArr = [];
            querySnapshot.forEach(doc => {
                todosArr.push({...doc.data(), id: doc.id});
            });
            setTodos(todosArr);
        });
        return unsubscribe;
    }, [user]);

    const addTask = async () => {
        if (!newTodo.trim()) return;
        try {
            await addDoc(collection(db, "todos"), {
                name: newTodo,
                completed: false,
                memo: "",
                createdAt: serverTimestamp(),
                uid: user.uid
            });
        } catch (err) {
            console.error("Error adding to do: ", err);
        };
    };
    
    const toggleCompleted = async (id, completed) => {
        const taskRef = doc(db, "todos", id);
        await updateDoc(taskRef, { completed: completed })
    }

    const editTask = async (id, newName, newMemo) => {
        const taskRef = doc(db, 'todos', id);
        await updateDoc(taskRef, { name: newName, memo: newMemo })
    }

    const removeTask = async (id) => {
        await deleteDoc(doc(db, "todos", id));
    };

    const removeAllTask = async () => {
        try {
            const batch = writeBatch(db);
            todos.forEach(todo => {
                const todoRef = doc(db, "todos", todo.id);
                batch.delete(todoRef);
            });
            await batch.commit();
        } catch (err){
            console.error(err)
        }
    }
    
    return (
        <div className="to-do-list-container relative select-none bg-slate-700 flex flex-col justify-around [@media(min-width:500px)]:rounded-xl p-5 py-10 w-full h-full max-w-[500px] max-h-[500px] lg:max-w-[700px] lg:max-h-[540px] xl:max-w-[800px] xl:max-h-[640px] 2xl:max-w-[900px]">
            <a onClick={() => signOut(auth)} className="absolute top-4 left-4 cursor-pointer bg-red-500 hover:bg-red-600 transition-colors px-1 rounded">
                <i className="fa-solid fa-arrow-right-from-bracket text-white"></i>
            </a>
            <DateName />
            <AddTask newTodo={newTodo} setNewTodo={setNewTodo} addTask={addTask} />
            <TaskList todos={todos}
            removeTask={removeTask}
            editTask={editTask}
            toggleCompleted={toggleCompleted}
            removeAllTask={removeAllTask} />
        </div>
    )
}