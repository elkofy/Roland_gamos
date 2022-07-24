import React from "react";
import { useNavigate } from "react-router-dom";


export default function LoginGuest() {
  let navigate = useNavigate();
  const [UserName, setUserName] = React.useState("");


  const handleChange = e => {
    setUserName(e.target.value)
    localStorage.setItem("User", e.target.value);
  }


  return (
    <div className="LoginForm">
      <div className="formulaire">
        <label>Entrez votre nom</label>
        <input type="text" value={UserName} onChange={handleChange} />

        <button className="form_Btn" onClick={() => { navigate('/waiting') }} >
          <span role='img' aria-label="rocket">🚀</span> GO  <span role='img' aria-label="rocket">🚀</span></button>
      </div>
    </div>
  );

}
