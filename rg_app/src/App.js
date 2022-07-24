import "./App.css";
import { SocketContext, socket } from './context/socket';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import React from "react";
import Header from "./Components/Header";
import LoginGuest from "./routes/LoginGuest";
import CardChoiceWrapper from "./Components/CardChoiceWrapper";
import Waiting from "./Components/Waiting";
import Create from "./Components/Create";
import Join from "./Components/Join";
import Lobby from "./Components/Lobby";
import Game from "./Components/Game";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header className="headerClass" />
        <SocketContext.Provider value={socket}>
          <Routes>
          <Route  path='/'  exact element={<CardChoiceWrapper />} />
            <Route  path="/loginguest"  exact element={<LoginGuest />} />
            <Route  path="/Waiting" exact element={<Waiting />} />
            <Route  path='/Create' exact element={<Create />} />
            <Route  path='/Join' exact element={<Join />} />
            <Route  path='/Lobby' exact element={<Lobby />} />
            <Route  path='/Game' exact element={<Game />} />

          </Routes>
        </SocketContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
