import React, { useState, useContext } from "react";
import { SocketContext } from '../context/socket';
import { useNavigate } from "react-router-dom";

export default function Join() {
    const [room, setRoom] = useState("foo");
    const socket = useContext(SocketContext);

    let navigate = useNavigate();

    const JoinRoom = () => {
        socket.emit('join', [room, localStorage.User]);

        localStorage.setItem('Room', room);
        navigate('/Lobby')

    }

    return (
        <div>
            <h1>Bienvenue {localStorage.User}</h1>
            <input type="text" value={room} placeholder="Nom du serveur" onChange={(e) => setRoom(e.target.value)} />
            <button onClick={JoinRoom} >Rejoindre</button>
            <div id="users"></div>
        </div>
    )

}