import { useTransition, animated } from "@react-spring/web";
import { useState } from "react";
import TaskRemove from "./TaskRemove";

function TaskSettings({ id, name, memo, isSettingsOpen, setIsSettingsOpen, editTask, removeTask }){
    const settingsTransition = useTransition(isSettingsOpen, {
        from: { transform: "translateY(150%)" },
        enter: { transform: "translateY(0%)" },
        leave: { transform: "translateY(150%)" },
        config: { tension: 150, friction: 25 },
    })

    const overlayTransition = useTransition(isSettingsOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { tension: 120, friction: 25 },
    });
    
    const [onEdit, setOnEdit] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newMemo, setNewMemo] = useState(memo);
    const [isRemoveAlert, setIsRemoveAlert] = useState(false);

    const handleExit = () => {
        setIsSettingsOpen(false);
        setOnEdit(false);
        setNewName(name);
        setNewMemo(memo);
    };
    
    const handleCancel = () => {
        setOnEdit(false);
        setNewName(name);
        setNewMemo(memo);
    };

    const handleRemove = () => {
        removeTask(id);
    }

    const handleSave = () => {
        editTask(id, newName, newMemo);
        setOnEdit(false);
    };

    return (
        <>
            {overlayTransition(
                (styles, item) => 
                    item && (
                        <animated.div className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-gray-500 z-10 p-4"
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.3)', pointerEvents: isSettingsOpen ? "auto" : "none", ...styles}}
                        onClick={handleExit}>
                            {settingsTransition(
                                (styles, item) =>
                                    item && (
                                        onEdit ? (
                                            <>
                                                <animated.form style={styles} onClick={e => e.stopPropagation()}
                                                className='settings-container w-full h-full max-w-[400px] max-h-[500px] 2xl:max-w-[500px] 2xl:max-h-[600px] bg-gray-700 border-2 border-gray-500 rounded-lg flex flex-col p-6 z-20'>
                                                    <i onClick={handleExit} className="fa-solid fa-xmark absolute top-2 right-4 text-2xl text-gray-100 cursor-pointer"></i>
                                                    
                                                    <div id="settings-name-container" className="flex flex-col">
                                                        <label htmlFor="settings-name" className="settings-name text-gray-100">Name</label>
                                                        <input id="settings-name" name="settings-name" value={newName} onChange={e => setNewName(e.target.value)} title={name} className="settings-name pl-1 text-gray-100 bg-slate-500" />
                                                    </div>
                                                    
                                                    <div id="settings-memo-container" className="flex flex-col flex-1">
                                                        <label htmlFor="settings-memo" className="mt-3 text-gray-100">Memo</label>
                                                        <textarea id="settings-memo" name="settings-memo" value={newMemo} onChange={e => setNewMemo(e.target.value)} rows={6} className="settings-memo pl-1 resize-none text-gray-100 bg-slate-500 flex-1"></textarea>
                                                    </div>
                                                    
                                                    <div className="settings-btn-container flex flex-col mt-3 gap-3">
                                                        <button type="button" onClick={() => setIsRemoveAlert(true)} className="bg-red-400 p-1 rounded text-gray-100">Remove</button>
                                                        <button type="button" onClick={handleCancel} className="bg-blue-400 p-1 rounded text-gray-100">Cancel</button>
                                                        <button type="button" onClick={handleSave} className="bg-green-400 p-1 rounded text-gray-100">Save</button>
                                                    </div>
                                                </animated.form>
                                                
                                                <TaskRemove isRemoveAlert={isRemoveAlert}
                                                setIsRemoveAlert={setIsRemoveAlert}
                                                handleRemove={handleRemove} />
                                            </>
                                        ) : (
                                            <>
                                                <animated.form style={styles} onClick={e => e.stopPropagation()}
                                                className='settings-container w-full h-full max-w-[400px] max-h-[500px] 2xl:max-w-[500px] 2xl:max-h-[600px] bg-gray-700 border-2 border-gray-500 rounded-lg flex flex-col p-6 z-20'>
                                                    <i onClick={handleExit} className="fa-solid fa-xmark absolute top-2 right-4 text-2xl text-gray-100 cursor-pointer"></i>
                                                    
                                                    <div id="settings-name-container" className="flex flex-col">
                                                        <label htmlFor="settings-name" className="text-gray-100">Name</label>
                                                        <input id="settings-name" name="settings-name" value={name} title={name} className="settings-name pl-1 text-gray-100 bg-slate-600" disabled />
                                                    </div>
                                                    
                                                    <div id="settings-memo-container" className="flex flex-col flex-1">
                                                        <label htmlFor="settings-memo" className="mt-3 text-gray-100">Memo</label>
                                                        <textarea id="settings-memo" name="settings-memo" value={memo} rows={6} className="settings-memo pl-1 resize-none text-gray-100 bg-slate-600 flex-1 mb-4" disabled></textarea>
                                                    </div>
                                                    
                                                    <div className="settings-btn-container flex flex-col gap-3 mt-auto">
                                                        <button type="button" onClick={() => setIsRemoveAlert(true)} className="bg-red-400 p-1 rounded text-gray-100">Remove</button>
                                                        <button type="button" onClick={() => setOnEdit(true)} className="bg-blue-400 p-1 rounded text-gray-100">Edit</button>
                                                        <button type="button" onClick={handleExit} className="bg-green-400 p-1 rounded text-gray-100">Ok</button>
                                                    </div>
                                                </animated.form>
                                                
                                                <TaskRemove isRemoveAlert={isRemoveAlert}
                                                setIsRemoveAlert={setIsRemoveAlert}
                                                handleRemove={handleRemove} />
                                            </>
                                        )
                                    )
                            )}
                        </animated.div>
                    )
            )}
        </>
    )
}

export default TaskSettings