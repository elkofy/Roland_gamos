
import React, { useState, useContext ,useEffect } from "react";

import { SocketContext } from '../context/socket';
import { useNavigate } from "react-router-dom";

export default function Create() {
    const [room, setRoom] = useState("foo");
    const socket = useContext(SocketContext);
    const [partyCode, setPartyCode] = useState("");
    let navigate = useNavigate();

    const CreateRoom = () => {
        socket.emit('create', [`${room}${partyCode}`, localStorage.User]);
        localStorage.setItem('Room', `${room}${partyCode}`);
        localStorage.setItem('Leader', 'leader');
        //pass leader to lobby
        navigate('/Lobby/?=Leader')
    }
    const makeid = () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 6; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    useEffect(() => {
        setPartyCode(makeid());
    } ,[])

    const copyCode = () => {
        navigator.clipboard.writeText(partyCode);
    }



    return (
        <div>
            <h1>Bienvenue {localStorage.User}</h1>
            <input type="text" value={room} placeholder="Nom du serveur" onChange={(e) => setRoom(e.target.value)} />
            <div className='partycode'>
                 <p>{partyCode}</p> 
                 <button onClick={copyCode}>Copy</button>
                </div>
            <button style={{paddingLeft:'12px'}} href="/Lobby" onClick={CreateRoom} >Créer</button>
        </div>
    );
}

