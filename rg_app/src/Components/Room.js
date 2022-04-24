import React, { useEffect, useState } from "react";
import socket from '../middleware/Socket';

export default function Room() {
    const [response, setResponse] = useState("");

    useEffect(() => {
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

