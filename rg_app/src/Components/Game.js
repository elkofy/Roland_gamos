import React, { useEffect, useState, useContext } from "react";
import Bluecard from "./cards/BlueCard";
import SmallDisplay from "./displays/SmallDisplay";
import medal from '../res/medal.svg';
import chrono from '../res/chrono.svg';
import BigDisplay from "./displays/BigDisplay";
import { SocketContext } from '../context/socket';
import BigDisplayInput from "./displays/BigDisplayInput";

export default function Game() {

    const socket = useContext(SocketContext);
    const [currentArtist, setCurrentArtist] = useState("");
    const [players, setPlayers] = useState({
        players: [],
    });
    const [gameState, setGameState] = useState({
        turn: 1,
        artists: [],
        currentPlayer: "",
        ended: false
    });
    const [answer, setAnswer] = useState('')
    const [selected, setSelected] = useState(true)


    const startGame = () => {
        console.log("startGame");
        getRandomArtist();
        socket.emit('players', localStorage.Room);

        socket.on('players', (data) => {
            // console.log('players', data);
            setPlayers(data);
        });

        socket.on('currentplayer', (data) => {
            // console.log('currentplayer', data);
            setSelected(data)
        });

        socket.on('updateGS', (data) => {
            console.log('socket listen gameState', data);
            setGameState(data);
        });
        socket.on('getRandArtist', (data) => {
            setCurrentArtist(data)
        });
    }

    const getRandomArtist = () => {
        console.log('getRandArtist');
        if (localStorage.Leader === "leader") {
            socket.emit('getRandArtist', localStorage.Room);
        }


    }
    const sendAnswer = () => {
        let num = Math.floor(Math.random() * 10);
        socket.emit('answer', [answer, localStorage.User, localStorage.Room, currentArtist]);
        socket.off('checking');
        socket.on('checking', (data) => {
            console.log('checking', data);
            if (data !== 'no featuring') {
                console.log('answer', answer);
                setCurrentArtist(answer);
                setGameState(
                    {
                        ...gameState,
                        turn: gameState.turn + 1,
                        currentPlayer: localStorage.User,
                        artists: [...gameState.artists, answer]
                    }
                )

            }
            else {
                console.log('no featuring ;(', answer);

                setGameState(
                    {
                        ...gameState,
                        turn: gameState.turn + 1,
                        currentPlayer: localStorage.User,
                        artists: [...gameState.artists, currentArtist],
                        ended: true
                    })

            } socket.off('checking');



        });
        console.log('gameState', gameState);
        socket.emit("updateGS", [gameState, localStorage.Room]);
        console.log(`this the function ${num}`, gameState.artists);
    }
    const handleChange = (e) => {
        setAnswer(e.target.value);



    }

    useEffect(() => {
        socket.removeAllListeners();
        startGame()

    }
        , []);

    return (
        <div className="game-view" >
            <Bluecard selected={selected} text={players[0]}></Bluecard>
            <div className="game-board" id="Wrapper">
                <div className="game-board__head">
                    <SmallDisplay smclass='sm-display-primary' text='ARTISTES :' textclass='sm-display__text--red' ></SmallDisplay>
                    <img src={medal} alt="artistes" className="sm-display__img"></img>
                    <img src={chrono} alt="artistes" className="sm-display__img"></img>
                    <SmallDisplay smclass='sm-display-primary' text='50 secondes' textclass='sm-display__text--black' ></SmallDisplay>
                </div>
                <div className="game-board__body">
                    <BigDisplay bigclass='big-display-primary' text={currentArtist} textclass='big-display__text--black' />
                    <SmallDisplay smclass='sm-display-primary' text="FEAT" textclass='sm-display__text--black--bold' />
                    <BigDisplayInput bigclass='big-display-primary' text="DOSSEH" textclass='big-display__text--black' inputvalue={answer} inputonChange={handleChange} />
                    <button onClick={sendAnswer}>Send</button>
                </div>

            </div>
            <Bluecard selected={!selected} text={players[1]}></Bluecard>

        </div>
    )

}
