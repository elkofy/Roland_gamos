import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from '../context/socket';
import { useNavigate } from "react-router-dom";
import Bluecard from "./cards/BlueCard";
import crown from "../res/crown.png";  

export default function WinnerCard() {

    const socket = useContext(SocketContext);
    let navigate = useNavigate();
    const [winner, setWinner] = useState("");

    useEffect(() => {
        socket.emit('endGame', localStorage.getItem("Room"));

        socket.on('winner', (data) => {
            setWinner(data);
        });
    }, []);

    return (
        <div className="WinnerCard">
            <h1 className="WinnerCard__title">Le gagnant est :</h1>
        <img src={crown} className ="WinnerCard__img" alt='crown' />
            <Bluecard text={winner} />

        </div>
    );
}