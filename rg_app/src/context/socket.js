import socketio from "socket.io-client";
import React from "react";
const ENDPOINT = 'http://127.0.0.1:4000';

export const socket = socketio.connect(ENDPOINT);
export const SocketContext = React.createContext();