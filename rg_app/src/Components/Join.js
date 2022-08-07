import React, { useState, useContext } from "react";
import ReactCodeInput from 'react-code-input';

import { SocketContext } from '../context/socket';
import { useNavigate } from "react-router-dom";

export default function Join() {
    const [room, setRoom] = useState("foo");
    const socket = useContext(SocketContext);
    const [partyCode, setPartyCode] = useState("");
    const props = {
        inputStyle: {
          fontFamily: 'monospace',
          margin:  '4px',
          MozAppearance: 'textfield',
          width: '40px',
          borderRadius: '3px',
          fontSize: '14px',
          height: '26px',
          paddingLeft: '7px',
          backgroundColor: 'white',
          color: 'lightskyblue',
          border: '1px solid lightskyblue'
        },
        inputStyleInvalid: {
          fontFamily: 'monospace',
          margin:  '4px',
          MozAppearance: 'textfield',
          width: '40px',
          borderRadius: '3px',
          fontSize: '14px',
          height: '26px',
          paddingLeft: '7px',
          backgroundColor: 'black',
          color: 'red',
          border: '1px solid red'
        }
      }
    let navigate = useNavigate();

    const JoinRoom = () => {
        socket.emit('join', [`${room}${partyCode}`, localStorage.User]);

        localStorage.setItem('Room', `${room}${partyCode}`);
        navigate('/Lobby')

    }
    const handleChange = (e) => {
        console.log(e);
        // setPartyCode(value);
    }

    return (
        <div>
            <h1>Bienvenue {localStorage.User}</h1>
            <input type="text" value={room} placeholder="Nom du serveur" onChange={(e) => setRoom(e.target.value)} />
            <ReactCodeInput type='text' fields={6} {...props} value={partyCode} onChange={(e)=> setPartyCode(e)}/>

            <button onClick={JoinRoom} >Rejoindre</button>
            <div id="users"></div>
        </div>
    )

}