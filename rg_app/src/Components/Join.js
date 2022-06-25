import React, { useState } from "react";
import socket from '../middleware/Socket';

export default function Join() {
    const [room, setRoom] = useState("");
    const JoinRoom = () => {
        socket.emit('join', [room, localStorage.User]);
        socket.emit('message', "joiner");
        localStorage.setItem('Room', room);
        window.location.href = "/Lobby";
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