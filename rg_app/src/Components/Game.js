import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Bluecard from "./cards/BlueCard";
import SmallDisplay from "./displays/SmallDisplay";
import medal from '../res/medal.svg';
import chrono from '../res/chrono.svg';
import BigDisplay from "./displays/BigDisplay";
import { SocketContext } from '../context/socket';
import BigDisplayInput from "./displays/BigDisplayInput";
import SmallDisplaytimer from "./displays/SmallDisplayTimer.js";
import useInterval from "./useInterval";
export let StartTimer = React.createContext(localStorage.getItem(false));


export default function Game() {

    const socket = useContext(SocketContext);
    const [players, setPlayers] = useState({
        players: [],
    });
    const [gameState, setGameState] = useState({});
    const [currentArtist, setCurrentArtist] = useState("");
    const [answer, setAnswer] = useState('')
    const [isEnded, setIsEnded] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [artists, setArtists] = useState([]);
    const [gameStarted, setGameStarted] = useState(true);
    let [timer, setTimer] = useState(30);
    let [delay, setDelay] = useState(1000);

    let navigate = useNavigate();


    useInterval(() => {

        if (timer !== 0) {
            setTimer(timer - 1)
        }
        else {
            setDelay(null)
            socket.emit('answer', ['idtefidzted', localStorage.User, localStorage.Room, currentArtist]);
        }
        console.log(timer)
    }, delay)

    const startGame = async () => {
        console.log("startGame");

        socket.on('players', (data) => {
            setPlayers(data);
        });

        socket.on('currentplayer', (data) => {
            setCurrentPlayer(data)


        });

        socket.on('answer', (data) => {
            // console.log('answer', data);
            setAnswer(data)
        })
        socket.on('updateGS', (data) => {
            console.log('updateGS', data);
            if (data.ended === true) {
                setIsEnded(true)
                navigate('/Winner');
            }
            setGameState(data);
            setCurrentArtist(data.currentArtist)
            setArtists(data.artists)
            setCurrentPlayer(data.currentPlayer)
            setTimer(30)
        });
        socket.on('end', (data) => {
            setIsEnded(data);
        });

        if (localStorage.Leader === "leader") {
            getRandomArtist();

            socket.emit('players', localStorage.Room);
            socket.emit('gameParams', [localStorage.Room, {
                manche: localStorage.manche,
                duree: localStorage.duree,
                vie: localStorage.vie
            }]);

        }



        socket.on('getRandArtist', (data) => {
            setCurrentArtist(data)
            setArtists([data])
            console.log('getRandArtist', data);

        });

    }



    const getRandomArtist = () => {
        // console.log('getRandArtist');
        socket.emit('getRandArtist', localStorage.Room);


    }


    const submitAnswer = () => {
        socket.emit('answer', [answer, localStorage.User, localStorage.Room, currentArtist]);
        setAnswer('');
    }

    const handleChange = (e) => {
        setAnswer(e.target.value);
    }

    useEffect(() => {
        //remove all previous socket connections
        socket.removeAllListeners();
        startGame()
    }
        , []);

    const endTurn = () => {
        alert('end turn')
    }

    return (
        <div className="game-view" >
            <div>{gameStarted}</div>
            <Bluecard selected={currentPlayer === players[0]} text={players[0]} />
            <div className="game-board" id="Wrapper">
                <div className="game-board__head">
                    <SmallDisplay smclass='sm-display-primary' text={`ARTISTES: ${artists.length}`} textclass='sm-display__text--red' />
                    <img src={medal} alt="artistes" className="sm-display__img" />
                    <img src={chrono} alt="artistes" className="sm-display__img" />
                    <SmallDisplaytimer isStarted={false} endTurn={endTurn} smclass='sm-display-primary' text='30 secondes' time={timer} textclass='sm-display__text--black' />
                </div>
                <div className="game-board__body">
                    <BigDisplay bigclass='big-display-primary' text={currentArtist} textclass='big-display__text--black' />
                    <SmallDisplay smclass='sm-display-primary' text="FEAT" textclass='sm-display__text--black--bold' />
                    <BigDisplayInput bigclass='big-display-primary' text="DOSSEH" textclass='big-display__text--black' inputvalue={answer} inputonChange={handleChange} />
                    <button disabled={currentPlayer !== localStorage.User} onClick={submitAnswer}>Send</button>
                </div>
            </div>
            <Bluecard selected={currentPlayer === players[1]} text={players[1]} />
        </div>
    )

}
