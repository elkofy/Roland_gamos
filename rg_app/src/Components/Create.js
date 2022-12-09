
import React, { useState, useContext, useEffect } from "react";

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
        navigate('/Lobby/?=Leader')
    }
    const makeId = () => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 6; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    useEffect(() => {
        setPartyCode(makeId());
    }, [])

    const copyCode = () => {
        navigator.clipboard.writeText(partyCode);
    }

    return (
        <div className="MainComponent">
            <h1>Bienvenue {localStorage.User}</h1>
            <div className="PartyForm">
                <div style={{display:"flex",flexDirection:"column"}}>
                    <label htmlFor="room" >Nom du serveur</label>
                    <input type="text" value={room} placeholder="Nom du serveur" onChange={(e) => setRoom(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="room" >Code</label>
                    <div className='partycode'>
                        <p>{partyCode}</p>
                        <button onClick={copyCode}>📋</button>
                    </div>
                </div>
                <button style={{ paddingLeft: '12px' }} href="/Lobby" onClick={CreateRoom} >Créer</button>
            </div>

        </div>
    );
}

