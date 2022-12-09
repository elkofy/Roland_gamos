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
import WinnerCard from './Components/WinnerCard';

function App() {

  return (
      <BrowserRouter>
        <Header />
        <SocketContext.Provider value={socket}>
          <Routes>
          <Route  path='/'  exact element={<LoginGuest />} />
            <Route  path="/Waiting" exact element={<Waiting />} />
            <Route  path='/Create' exact element={<Create />} />
            <Route  path='/Join' exact element={<Join />} />
            <Route  path='/Lobby' exact element={<Lobby />} />
            <Route  path='/Game' exact element={<Game />} />
            <Route path='/Winner' exact element={<WinnerCard />} />

          </Routes>
        </SocketContext.Provider>
      </BrowserRouter>
  );
}

export default App;
