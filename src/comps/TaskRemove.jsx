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
                                    className='remove-alert-container w-11/12 h-1/6 bg-gray-700 border-2 border-gray-500 rounded-lg flex justify-center'>
                                        <p className="mt-2 text-lg text-gray-100">Delete this task?</p>
                                        <button onClick={() => setIsRemoveAlert(false)}
                                        className="remove-alert-btn remove-alert-no absolute bottom-2 left-4 bg-red-400 text-gray-100">
                                            No
                                        </button>
                                        <button onClick={handleRemove}
                                        className="remove-alert-btn remove-alert-yes absolute bottom-2 right-4 bg-green-400 text-gray-100">
                                            Yes
                                        </button>
                                    </animated.div>
                                )
                        )}
                    </animated.div>
                )
        )
    )
}

export default TaskRemove