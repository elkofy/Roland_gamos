import React, { useEffect, useState } from "react";

import socket from '../middleware/Socket';
import Selector from "./Selector";
export default function Lobby() {
    // const [response, setResponse] = useState("");
    const [users, setUsers] = useState([]);
    const [isLeader, setIsLeader] = useState(false);
    // const [divs, setDivs] = useState("");

    function getListUsers() {
        socket.emit("getListUsers", localStorage.Room)
        socket.on("listUsers", (data) => {
            setUsers(data);
            console.log(data);
        });
        socket.on("hello", (arg) => {
            console.log(arg); // world
          });
        socket.on('message', (data) => {
            console.log(data);
        });
    

        // socket.emit(users, localStorage.Room);
        // socket.on("users", (data) => {
        //     // setUsers(data);
        //     console.log(data);
        // });
        console.log("getListUsers");
        setIsLeader(window.location.href.includes("Leader")) 
    }

    const StartGame = ()=> {
        console.log("StartGame");
        window.location.href = window.location.href.replace("Lobby/?=Leader", "Game");

    }

    useEffect(() => {
        getListUsers();
    }, []);

    let items = users.map(user => {
        console.log(user);
        return <div className="User_Card" key={user}>{user}</div>
    });

    return (
        <div className="Lobby">

            <div className="Blue_card">
                <h3 className="Blue_card_title">Joueurs :</h3>
                <div className="User_lists">
                    {items}
                </div>
            </div>
            <div className="Blue_card">
                <h3 className="Blue_card_title">Paramètres :</h3>
                <div className="Blue_card_content">
                    <div className="bc_section">
                        <h5>Manche :</h5>
                        <Selector className='manche_item' />
                    </div>
                    <div className="bc_section">
                        <h5>Durée :</h5>
                        <Selector className='duree_item' />
                    </div>
                    <div className="bc_section">
                        <h5>Vie :</h5>
                        <Selector className='vie_item' />
                    </div>
                </div>
            </div>
            {}
            <div>
                {isLeader ?<button className="form_Btn" onClick={StartGame} >🚀 GO ! 🚀</button> : ""}
                
            </div>
        </div>

    );
}