import React from "react";
import create from "../res/create.png"
import join from "../res/join.png"


export default function Waiting() {

    return (
        <div>
            <h1>Bienvenue {localStorage.User}</h1>
            <div>
            </div>
            <div className="CardChoice-wrapper">
                <div className="innerCardclass">
                    <a href="/Create">
                        <img alt="logo" src={create} className="cardlogoclass" />
                        <div className="cardplaceholderclass">
                            Créer un serveur
                        </div>
                    </a>
                </div>
                <div className="innerCardclass">
                    <a href="/Join">
                        <img alt="logo" src={join} className="cardlogoclass" />
                        <div className="cardplaceholderclass">
                            Rejoindre un serveur
                        </div>
                    </a>
                </div>


            </div>
        </div>

    );
}

