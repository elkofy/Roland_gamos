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
    const [players, setPlayers] = useState({
        players: [],
    });
    const [gameState, setGameState] = useState({});

    const [currentArtist, setCurrentArtist] = useState("");
    const [answer, setAnswer] = useState('')
    const [turns, setTurns] = useState(1);
    const [isTurn, setIsTurn] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [selected, setSelected] = useState(true);




    const startGame = async () => {
        console.log("startGame");

        socket.on('players', (data) => {
            // console.log('players', data);
            setPlayers(data);
        });

        socket.on('currentplayer', (data) => {
            // console.log('currentplayer', data);
            setSelected(data)
        });

        socket.on('answer', (data) => {
            // console.log('answer', data);
            setAnswer(data)
        })
        socket.on('updateGS', (data) => {
            console.log('socket listen gameState', data);
            setGameState(data);
            setCurrentArtist(data.currentArtist)
        });
        socket.on('end', (data) => {
            console.log('end', data);
            setIsEnded(data);
        });

        if (localStorage.Leader === "leader") {
            getRandomArtist();

            socket.emit('players', localStorage.Room);
        }


        socket.on('getRandArtist', (data) => {
            console.log('getRandArtist', data);
            setCurrentArtist(data)

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
            <Bluecard selected={selected} text={players[0]} />
            <div className="game-board" id="Wrapper">
                <div className="game-board__head">
                    <SmallDisplay smclass='sm-display-primary' text='ARTISTES :' textclass='sm-display__text--red' />
                    <img src={medal} alt="artistes" className="sm-display__img" />
                    <img src={chrono} alt="artistes" className="sm-display__img" />
                    <SmallDisplay smclass='sm-display-primary' text='50 secondes' textclass='sm-display__text--black' />
                </div>
                <div className="game-board__body">
                    <BigDisplay bigclass='big-display-primary' text={currentArtist} textclass='big-display__text--black' />
                    <SmallDisplay smclass='sm-display-primary' text="FEAT" textclass='sm-display__text--black--bold' />
                    <BigDisplayInput bigclass='big-display-primary' text="DOSSEH" textclass='big-display__text--black' inputvalue={answer} inputonChange={handleChange} />
                    <button onClick={submitAnswer}>Send</button>
                </div>
            </div>
            <Bluecard selected={!selected} text={players[1]} />

        </div>
    )

}
