import { useTransition, animated } from "@react-spring/web";

function TaskRemove({ isRemoveAlert, setIsRemoveAlert, handleRemove }){
    const alertTransition = useTransition(isRemoveAlert, {
        from: { transform: "translateY(150%)" },
        enter: { transform: "translateY(0%)" },
        leave: { transform: "translateY(150%)" },
        config: { tension: 150, friction: 25 },
    })

    const overlayTransition = useTransition(isRemoveAlert, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { tension: 120, friction: 25, duration: 500 },
    });

    return(
        overlayTransition(
            (styles, item) => 
                item && (
                    <animated.div style={{backgroundColor: 'rgba(0, 0, 0, 0.3)', pointerEvents: isRemoveAlert ? "auto" : "none", ...styles}} 
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsRemoveAlert(false)
                    }} className='fixed top-0 left-0 h-full w-full flex justify-center items-center bg-gray-500 z-20'>
                        {alertTransition(
                            (styles, item) =>
                                item && (
                                    <animated.div style={styles} onClick={e => e.stopPropagation()}
                                    className='remove-alert-container w-[80%] max-w-[360px] max-h-[100px] xl:max-w-[380px] xl:max-h-[140px] h-1/6 bg-gray-700 border-2 border-gray-500 rounded-lg flex flex-col items-center justify-center gap-1 lg:gap-3 xl:gap-4'>
                                        <p className="remove-alert-text text-lg text-gray-100">Delete this task?</p>
                                        <div className="flex space-x-10">
                                            <button onClick={() => setIsRemoveAlert(false)}
                                            className="remove-alert-btn w-10 lg:w-12 xl:w-14 2xl:w-16 text-gray-100 bg-red-400 rounded-full flex items-center justify-center transition-transform transform hover:scale-110">
                                                No
                                            </button>
                                            <button onClick={handleRemove}
                                            className="remove-alert-btn w-10 lg:w-12 xl:w-14 2xl:w-16 text-gray-100 bg-green-400 rounded-full flex items-center justify-center transition-transform transform hover:scale-110">
                                                Yes
                                            </button>
                                        </div>
                                    </animated.div>
                                )
                        )}
                    </animated.div>
                )
        )
    )
}

export default TaskRemove