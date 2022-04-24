import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import LoginGuest from "./routes/LoginGuest";
import CardChoiceWrapper from "./Components/CardChoiceWrapper";
import Room from "./Components/Room";
import Waiting from "./Components/Waiting";
import Create from "./Components/Create";
import Join from "./Components/Join";
import Lobby from "./Components/Lobby";

function App() {
  return (
    <div className="App">
      <Header className="headerClass" />
      <Routes>
        <Route exact path="/loginguest" element={<LoginGuest />} />
        <Route exact path="/" element={<CardChoiceWrapper />} />
        <Route path="/Room" element={<Room />} />
        <Route path="/Waiting" element={<Waiting />} />
        <Route path='/Create' element={<Create />} />
        <Route path='/Join' element={<Join />} />
        <Route path='/Lobby' element={<Lobby />} />
      </Routes>
    </div>
  );
}

export default App;
