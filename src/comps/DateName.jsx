import { useEffect, useState } from "react";

export default function DateName(){
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const getDatePerTime = setInterval(() => {
            setDate(new Date())
        }, 600000);
        return () => clearInterval(getDatePerTime);
    }, [])

    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = `${month}-${day}-${year}`;

    return (
        <div className="">
            <p className="day-name text-center text-gray-300">{dayName}</p>
            <p className="full-date text-center text-gray-400">{fullDate}</p>
        </div>
    )
}