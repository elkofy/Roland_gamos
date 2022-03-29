import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import LoginGuest from "./routes/LoginGuest";
import CardChoiceWrapper from "./Components/CardChoiceWrapper";
import Room from "./Components/Room";
import Join from "./Components/Join";


function App() {
  return (
    <div className="App">
      <Header className="headerClass"/>
      <Routes>
        <Route exact path="/loginguest" element={<LoginGuest />} />
        <Route exact path="/" element={<CardChoiceWrapper />} />
        <Route  path="/Room" element={<Room />} />
        <Route  path="/Join" element={<Join/>} />

      </Routes>
    </div>
  );
}

export default App;
