
import React, { useState } from "react";
import socket from '../middleware/Socket';


export default function Create() {
    const [room, setRoom] = useState("");


    return (
        <div>
            <h1>Bienvenue {localStorage.User}</h1>
            <input type="text" value={room} placeholder="Nom du serveur" onChange={(e) => setRoom(e.target.value)} />
            <button href="/Lobby" onClick={
                () => {
                    socket.emit('create', [room, localStorage.User]);
                    localStorage.setItem('Room', room);
                    localStorage.setItem('Leader', 'leader');
                    //pass leader to lobby
                    window.location.href = "/Lobby/?=Leader";
                }
            } >Créer</button>

        </div>
    );
}

