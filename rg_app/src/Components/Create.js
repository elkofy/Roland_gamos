
import React, { useState, useContext } from "react";
import { SocketContext } from '../context/socket';
import { useNavigate } from "react-router-dom";

export default function Create() {
    const [room, setRoom] = useState("foo");
    const socket = useContext(SocketContext);
    let navigate = useNavigate();

    const CreateRoom = () => {
        socket.emit('create', [room, localStorage.User]);
        localStorage.setItem('Room', room);
        localStorage.setItem('Leader', 'leader');
        //pass leader to lobby
        navigate('/Lobby/?=Leader')
    }


    return (
        <div>
            <h1>Bienvenue {localStorage.User}</h1>
            <input type="text" value={room} placeholder="Nom du serveur" onChange={(e) => setRoom(e.target.value)} />
            <button href="/Lobby" onClick={CreateRoom} >Créer</button>
        </div>
    );
}

