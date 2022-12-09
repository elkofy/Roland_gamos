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
      MozAppearance: 'textfield',
      marginRight: '5px',
      width: '40px',
      borderRadius: '3px',
      fontSize: '14px',
      height: '26px',
      backgroundColor: 'white',
      color: 'lightskyblue',
      border: '1px solid lightskyblue'
    },
    inputStyleInvalid: {
      fontFamily: 'monospace',
      MozAppearance: 'textfield',
      marginRight: '5px',
      width: '40px',
      borderRadius: '3px',
      fontSize: '14px',
      height: '26px',
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

  return (
    <div className="MainComponent">
      <h1>Bienvenue {localStorage.User}</h1>
      <div className="PartyForm">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="room" >Nom du serveur</label>
          <input type="text" value={room} placeholder="Nom du serveur" onChange={(e) => setRoom(e.target.value)} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="room" >Code</label>
          <ReactCodeInput type='text' fields={6} {...props} value={partyCode} onChange={(e) => setPartyCode(e)} />
        </div>
        <button onClick={JoinRoom} >Rejoindre</button>
        <div id="users"></div>
      </div>

    </div>
  )

}