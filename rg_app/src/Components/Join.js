import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";

export default function Join() {

    return (
        <div>
            <h1>Bienvenue {localStorage.User}</h1>
            <div>
                <button onClick={() => {
                    const socket = socketIOClient(ENDPOINT);
                    socket.emit('create', 'room1');
                }}>
                    🚀 Creer 🚀
                </button>
                <button onClick={() => {
                    window.location.href = "/Room/";
                }}>
                    🚀 Rejoindre 🚀
                </button>

            </div>
        </div>

    );
}

