import { useTransition, animated } from "@react-spring/web";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../../store/alertSlice";

export default function AlertPopup({ removeAllTask, logout }){
    const { alertType } = useSelector(state => state.alert)
    const dispatch = useDispatch()

    if (!alertType) return;

    const actionMap = {
        REMOVE_ALL: {
            function: removeAllTask,
            text: 'Delete all task?'
        },
        LOGOUT: {
            function: logout,
            text: 'Are you sure?'
        },
    };

    const onCancel = () => {
        dispatch(clearAlert());
    };
    
    const onConfirm = () => {
        if(actionMap[alertType]) {
            actionMap[alertType]['function']()
        };
        onCancel();
    }

    return(
        <div id="alert-popup-overlay" className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-[rgba(0,0,0,0.3)] z-20"
        onClick={onCancel}>
            <div id="alert-popup-container" onClick={e => e.stopPropagation()}
            className='w-[80%] max-w-[360px] max-h-[100px] xl:max-w-[380px] xl:max-h-[140px] h-1/6 bg-gray-700 border-2 border-gray-500 rounded-lg flex flex-col items-center justify-center gap-1 lg:gap-3 xl:gap-4'>
                <p className="alert-text text-lg text-gray-100">{actionMap[alertType]['text']}</p>
                <div className="flex space-x-10">
                    <button onClick={onCancel}
                    className="alert-btn w-10 lg:w-12 xl:w-14 2xl:w-16 text-gray-100 bg-red-400 rounded-full flex items-center justify-center transition-transform transform hover:scale-110">
                        No
                    </button>
                    <button onClick={onConfirm}
                    className="alert-btn w-10 lg:w-12 xl:w-14 2xl:w-16 text-gray-100 bg-green-400 rounded-full flex items-center justify-center transition-transform transform hover:scale-110">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    )
}