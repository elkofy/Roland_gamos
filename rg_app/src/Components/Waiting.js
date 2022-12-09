import React from "react";
import create from "../res/create.png"
import join from "../res/join.png"
import { Link } from "react-router-dom";
export default function Waiting() {

    return (
        <div className="MainComponent">
            <h1>Bienvenue {localStorage.User}</h1>
            <div className="CardChoice-wrapper">
                <div className="outerCardclass">
                    <div className="innerCardclass">
                        <Link to="/Create">
                            <img alt="logo" src={create} className="cardlogoclass" />
                            <div className="cardplaceholderclass">
                                Créer une partie 
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="outerCardclass">

                    <div className="innerCardclass">
                        <Link to="/Join">
                            <img alt="logo" src={join} className="cardlogoclass" />
                            <div className="cardplaceholderclass">
                                Rejoindre une partie
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </div>

    );
}

