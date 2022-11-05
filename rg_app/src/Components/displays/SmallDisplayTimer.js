import React from "react";
import './SmallDisplay.css';

export default function SmallDisplayTimer(props) {

    return (
        <div className={props.smclass}>
            <div className={props.textclass}>{`${props.time} secondes`}</div>
        </div>
    )
}
