import React, { useEffect, useState } from "react";
import socket from '../middleware/Socket';

export default function Lobby() {
    const [response, setResponse] = useState("");
    const [users, setUsers] = useState([]);
    const [divs, setDivs] = useState("");

    function getListUsers() {

        socket.emit("getListUsers");
        socket.on("listUsers", data => {
            console.log(data);
            setUsers(data);

        });
        console.log("getListUsers");

        return users.map(user => {
            return (
                <div className="User_Card" key={user.id}>
                    {user.user}
                </div>
            )
        })

    }

    useEffect(() => {
        getListUsers();
    },[]);

 let items = users.map(user => {
     return <div className="User_Card" key={user.id}>{user.user}</div>
    });

    return ( 
        <div className="Lobby">
            
            <div className="Blue_card">
                <h3 className="Blue_card_title">Joueurs :</h3>
                <div className="User_lists">
                    {/* <div className="User_Card">Nassim</div>
                    <div className="User_Card">Phillipe</div> */}
                    {//getListUsers()
                    }
                    {items}
                </div>
            </div>
            <div className="Blue_card">
                <h3 className="Blue_card_title">Paramètres :</h3>
                <div className="Blue_card_content">
                    <div className="bc_section">
                        <h5>Manche :</h5>
                        <div id="Manchegrid" className="bc_grid">
                            <div id="manche1" className="bc_item bc_item_selected" onClick={() => {
                                socket.emit("setManche", "1");
                                const divs = document.querySelectorAll('.bc_item');
                                const divsArray = [...divs].slice(0, 3);
                                console.log(divsArray[0].classList.contains('bc_item_selected'));
                                if (divsArray[0].classList.contains('bc_item_selected')) {
                                    // divsArray[0].classList.remove('bc_item_selected');
                                    divsArray.forEach(div => {
                                        div.classList.remove('bc_item_selected');
                                    });
                                    // console.log("1");
                                }
                                else {
                                    divsArray.forEach(div => {
                                        div.classList.remove('bc_item_selected');
                                    });
                                    divsArray[0].classList.add('bc_item_selected');
                                    // console.log("2");                                                                    
                                }

                            }} >
                                1
                            </div>
                            <div className="bc_item" onClick={() => {
                                socket.emit("setManche", "2");
                                const divs = document.querySelectorAll('.bc_item');
                                const divsArray = [...divs].slice(0, 3);
                                // console.log(divsArray[0].classList.contains('bc_item_selected'));
                                if (divsArray[1].classList.contains('bc_item_selected')) {
                                    // divsArray[0].classList.remove('bc_item_selected');
                                    divsArray.forEach(div => {
                                        div.classList.remove('bc_item_selected');
                                    });
                                    // console.log("1");
                                }
                                else {
                                    divsArray.forEach(div => {
                                        div.classList.remove('bc_item_selected');
                                    });
                                    divsArray[1].classList.add('bc_item_selected');
                                    // console.log("2");                                                                    
                                }

                            }}>
                                2
                            </div>
                            <div className="bc_item" onClick={() => {
                                socket.emit("setManche", "3");
                                const divs = document.querySelectorAll('.bc_item');
                                const divsArray = [...divs].slice(0, 3);
                                // console.log(divsArray[0].classList.contains('bc_item_selected'));
                                if (divsArray[2].classList.contains('bc_item_selected')) {
                                    // divsArray[0].classList.remove('bc_item_selected');
                                    divsArray.forEach(div => {
                                        div.classList.remove('bc_item_selected');
                                    });
                                    // console.log("1");
                                }
                                else {
                                    divsArray.forEach(div => {
                                        div.classList.remove('bc_item_selected');
                                    });
                                    divsArray[2].classList.add('bc_item_selected');
                                    // console.log("2");                                                                    
                                }

                            }}>
                                3
                            </div>
                        </div>
                    </div>
                    <div className="bc_section">
                        <h5>Durée :</h5>
                        <div className="bc_grid">
                            <div className="bc_item">
                                30s
                            </div>
                            <div className="bc_item">
                                60s
                            </div>
                            <div className="bc_item">
                                90s
                            </div>
                        </div>
                    </div>
                    <div className="bc_section">
                        <h5>Vie :</h5>
                        <div className="bc_grid">
                            <div className="bc_item">
                                1
                            </div>
                            <div className="bc_item">
                                2
                            </div>
                            <div className="bc_item">
                                3
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button className="form_Btn">🚀 GO ! 🚀</button>
            </div>
        </div>

    );
}