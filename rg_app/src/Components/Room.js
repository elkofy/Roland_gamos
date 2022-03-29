import React, { useEffect, useState } from "react";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";

export default function Room() {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            setResponse(data);
        });

    }, []);
    return (
        <p>
            It's <time dateTime={response}>{response}</time>
        </p>
    );
}

