import React from "react";
import './SmallDisplay.css';

export default function SmallDisplay(props) {
return (
    <div className={props.smclass}>
        <div className={props.textclass}>{props.text}</div>
    </div>
)
}
