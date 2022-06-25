
import React, { useState, useContext } from "react";
import { SocketContext } from '../context/socket';
import { connect, sendMsg } from "../api";

export default function Create() {
    const [room, setRoom] = useState("");
    // const socket = useContext(SocketContext);

    const CreateRoom = () => {
        // socket.emit('create', [room, localStorage.User]);
        // let user = localStorage.User;
        // socket.emit('create',( { user, room }, (data) => {
        //     console.log("client", data);
        // }));
        // localStorage.setItem('Room', room);
        // localStorage.setItem('Leader', 'leader');
        // //pass leader to lobby
        // window.location.href = "/Lobby/?=Leader";
    }
    const send = () => {
        console.log("hello");
        sendMsg("hello");
      }

    return (
        <div>
            <h1>Bienvenue {localStorage.User}</h1>
            <input type="text" value={room} placeholder="Nom du serveur" onChange={(e) => setRoom(e.target.value)} />
            <button href="/Lobby" onClick={send} >Créer</button>
        </div>
    );
}

