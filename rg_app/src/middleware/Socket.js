import socketIOClient from "socket.io-client";
const ENDPOINT = 'http://127.0.0.1:4000';
export default socketIOClient(ENDPOINT);