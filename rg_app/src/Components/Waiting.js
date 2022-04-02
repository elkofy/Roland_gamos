import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import create from "../res/create.png"
import join from "../res/join.png"

const ENDPOINT = "http://127.0.0.1:4000";

export default function Waiting() {

    return (
        <div>
            <h1>Bienvenue {localStorage.User}</h1>
            <div>
                {/* <button onClick={() => {
                    const socket = socketIOClient(ENDPOINT);
                    socket.emit('create', 'room1' );
                    
                }}>
                    🚀 Creer 🚀
                </button>
                <button onClick={() => {
                     const socket = socketIOClient(ENDPOINT);
                     socket.emit('join', 'room1');
                     socket.on('message', data => {
                            console.log(data);
                        }
                    );
                }}>
                    🚀 Rejoindre 🚀
                </button> */}

            </div>
            <div className="CardChoice-wrapper">
                <div className="innerCardclass">
                    <a href="/Create">
                        <img alt="logo" src={create} className="cardlogoclass" />
                        <div className="cardplaceholderclass">
                            Créer un serveur
                        </div>
                    </a>
                </div>
                <div className="innerCardclass">
                    <a href="/Join">
                        <img alt="logo" src={join} className="cardlogoclass" />
                        <div className="cardplaceholderclass">
                            Rejoindre un serveur
                        </div>
                    </a>
                </div>


            </div>
        </div>

    );
}

