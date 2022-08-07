import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from '../context/socket';
import { useNavigate } from "react-router-dom";

import Selector from "./Selector";
export default function Lobby() {
    const socket = useContext(SocketContext);
    let navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isLeader, setIsLeader] = useState(false);


    function getListUsers() {
        setIsLeader(window.location.href.includes("Leader"))
        socket.on('room', (data) => {
            setUsers(data);
        });
        socket.on('startGame', () => {
            if (window.location.href !== `http://localhost:3000/Game`) {
                navigate('/Game');
            }
        });


    }

    const StartGame = () => {
        socket.emit('startGame', localStorage.getItem("Room"));
    }

    useEffect(() => {
        getListUsers();
    }, []);

    let items = users.map(user => {
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

            {isLeader ? <div className="Blue_card">
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
            </div> : <div className="load-bar">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className='loadertxt'> En attente de l'hote</div>
            </div> }

            <div>
                {isLeader ? <button className="form_Btn" onClick={StartGame} ><span role='img' aria-label="rocket">🚀</span>  GO ! <span role='img' aria-label="rocket">🚀</span> </button> : ""}

            </div>
        </div>

    );
}