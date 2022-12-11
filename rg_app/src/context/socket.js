import socketio from "socket.io-client";
import React from "react";
const ENDPOINT = 'https://roland-gamos-2g36.vercel.app/';

export const socket = socketio.connect(ENDPOINT);
export const SocketContext = React.createContext();