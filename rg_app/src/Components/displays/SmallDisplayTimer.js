import React, { useEffect, useState } from "react";
import './SmallDisplay.css';

export default function SmallDisplayTimer(props) {
    // Get the current time
    // const [currentime, setCurrentTime] = useState(props.time);
    const [counter, setCounter] = React.useState(props.time);

    // const startTimer = () => {
    //     setCurrentTime(props.time);
    //     let myTimer = () => {
    //         while (currentime > 0) {
    //             setCurrentTime(currentime - 1);
    //             console.log(currentime);    
    //         }
    //             setCurrentTime(0);
    //             console.log("timer ended");
    //             stop();

    //     }
    //     const stop=()=>{
    //         clearInterval(interval);
    //     }
    //     const interval = setInterval(myTimer, 1000);
    // }

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
        , [counter])

    return (
        <div className={props.smclass}>
            <div className={props.textclass}>{`${counter} secondes`}</div>
        </div>
    )
}
