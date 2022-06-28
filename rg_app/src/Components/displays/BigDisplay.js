import React, { useState, useContext } from "react";
import './BigDisplay.css';

export default function BigDisplay(props) {
return (
    <div className={props.bigclass}>
        <div className={props.textclass}>{props.text}</div>
    </div>
)
}
