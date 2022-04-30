import React, { useState } from "react";
import socket from '../middleware/Socket';

export default function Join() {
    const [room, setRoom] = useState("");

    return (
        <div>
            <h1>Bienvenue {localStorage.User}</h1>
            <input type="text" value={room} placeholder="Nom du serveur" onChange={(e) => setRoom(e.target.value)} />
            <button  onClick={
                () => {
                    socket.emit('join', [room , localStorage.User]);
                    socket.emit('message', "joiner");
                    localStorage.setItem('Room', room);
                    socket.on('joiner', data => {
                        console.log(data);
                    });
                    //go to lobby
                    window.location.href = "/Lobby";
                }
            } >Rejoindre</button>
            <div id="users"></div>
        </div>
    )

}