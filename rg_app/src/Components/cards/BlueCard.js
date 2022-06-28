import React, { useEffect, useState, useContext } from "react";
import avatar from "../../res/avatar.svg";  

import './BlueCard.css';

export default function Bluecard(props) {
    return (
        <div className="blue-card">
            
            <img className="blue-card__img" src={avatar} />
            <div className="blue-card__placeholder">
                <div className="blue-card__placeholder-text">
                {props.text==="" ? "USER_1":props.text}
                </div>
            </div>
        </div>
    )
}