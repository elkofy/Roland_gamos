import React, { useEffect, useState, useContext } from "react";
import Bluecard from "./cards/BlueCard";
import SmallDisplay from "./displays/SmallDisplay";
import medal from '../res/medal.svg';
import chrono from '../res/chrono.svg';
import BigDisplay from "./displays/BigDisplay";
import { SocketContext } from '../context/socket';

export default function Game() {
    const socket = useContext(SocketContext);
    const [gameState, setGameState] = useState({
        game: {
            turn: 0,
        }
    });
    const [players, setPlayers] = useState({
        players: [],
    });
    const [answer, setAnswer] = useState('')
    const startGame = () => {
        socket.emit('startGame', localStorage.Room);
        socket.emit('players', localStorage.Room);
        socket.on('players', (data) => {
            console.log(data);
            setPlayers(data);
        }
        );
        socket.on('checking', (data) => {
            console.log(data);
            // setGameState(data);
        });
    }
    const sendAnswer = () => {
        let prevanswer = 'dinos'
        socket.emit('answer', [answer, localStorage.User, localStorage.Room, prevanswer]);
    }
    const handleChange = (e) => {
        console.log(e.target.value);
        setAnswer(e.target.value);
        console.log(answer);
    }

    useEffect(() => {
        startGame();
    }
        , []);

    return (
        <div className="game-view" >
            <Bluecard text={players[0]}></Bluecard>
            <div className="game-board" id="Wrapper">
                <div className="game-board__head">
                    <SmallDisplay smclass='sm-display-primary' text='ARTISTES :' textclass='sm-display__text--red' ></SmallDisplay>
                    <img src={medal} alt="artistes" className="sm-display__img"></img>
                    <img src={chrono} alt="artistes" className="sm-display__img"></img>
                    <SmallDisplay smclass='sm-display-primary' text='50 secondes' textclass='sm-display__text--black' ></SmallDisplay>
                </div>
                <div className="game-board__body">
                    <BigDisplay bigclass='big-display-primary' text="DINOS" textclass='big-display__text--black'></BigDisplay>
                    <SmallDisplay smclass='sm-display-primary' text="FEAT" textclass='sm-display__text--black--bold'></SmallDisplay>
                    <BigDisplay bigclass='big-display-primary' text="DOSSEH" textclass='big-display__text--black'></BigDisplay>
                    <div>
                        <p className="turn--enabled">A votre tour</p>
                        <p className="turn--enabled">V</p>
                        <p className="turn--disabled">X</p>

                        <input value={answer} onChange={handleChange} ></input>
                        <button onClick={sendAnswer}>Send</button>
                    </div>
                </div>

            </div>
            <Bluecard text={players[1]}></Bluecard>

        </div>
    )

}
