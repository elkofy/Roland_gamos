import React from "react";
import './BigDisplay.css';

export default function BigDisplayInput(props) {

   


    return (
        <div className={props.bigclass}>
            <div className={props.textclass}>
                <input onChange={props.inputonChange} value={props.inputvalue}>
                </input>
            </div>
        </div>
    )
}
