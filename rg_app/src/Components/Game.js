import React, { useEffect, useState, useContext } from "react";
import Bluecard from "./cards/BlueCard";
import SmallDisplay from "./displays/SmallDisplay";
import medal from '../res/medal.svg';
import chrono from '../res/chrono.svg';
import BigDisplay from "./displays/BigDisplay";
import { SocketContext } from '../context/socket';
import BigDisplayInput from "./displays/BigDisplayInput";
import SmallDisplaytimer from "./displays/SmallDisplayTimer.js";

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




    const startGame = async () => {
        console.log("startGame");

        socket.on('players', (data) => {
            // console.log('players', data);
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
                alert(`${data.winner} won the game`)
            }
            setGameState(data);
            setCurrentArtist(data.currentArtist)
            setArtists(data.artists)
            setCurrentPlayer(data.currentPlayer)
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

        });


    }


    const getRandomArtist = () => {
        // console.log('getRandArtist');
        socket.emit('getRandArtist', localStorage.Room);

    }
    /*
     *This function is called when the user clicks on the button.
     *It will send the message to the server and then clear the input. 
     */
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

    return (
        <div className="game-view" >
            <Bluecard selected={currentPlayer === players[0]} text={players[0]} />
            <div className="game-board" id="Wrapper">
                <div className="game-board__head">
                    <SmallDisplay smclass='sm-display-primary' text={`ARTISTES: ${artists.length}`} textclass='sm-display__text--red' />
                    <img src={medal} alt="artistes" className="sm-display__img" />
                    <img src={chrono} alt="artistes" className="sm-display__img" />
                    <SmallDisplaytimer smclass='sm-display-primary' text='50 secondes' time={30} textclass='sm-display__text--black' />
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
