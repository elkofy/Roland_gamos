import socketio from "socket.io-client";
import React from "react";
const ENDPOINT = 'https://roland-gamos-api.herokuapp.com/';

export const socket = socketio.connect(ENDPOINT);
export const SocketContext = React.createContext();