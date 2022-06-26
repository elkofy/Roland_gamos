import React, { Component } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";


export default function LoginGuest() {

  const [UserName, setUserName] = React.useState("");


  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  const handleChange = e => {
    setUserName(e.target.value)
    localStorage.setItem("User", e.target.value);
  }


    return (
      <div className="LoginForm">
        <div className="formulaire">
          <label>Entrez votre nom</label>
          <input type="text" value={UserName} onChange={handleChange} />

          <button className="form_Btn" onClick={() => { navigate('/waiting') }} >🚀 GO 🚀</button>
        </div>
      </div>
    );
  
}
