import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function LoginGuest() {
  let navigate = useNavigate();
  const [UserName, setUserName] = useState("");
  const [isValid, setIsValid] = useState(false);


  const handleChange = e => {
    if (e.target.value.trim() !== "") {
      localStorage.setItem("User", e.target.value.trim());
      setIsValid(true)
    } else {
      setIsValid(false)
    }
    setUserName(e.target.value.trim())
  }


  return (
    <div className="LoginForm">
      <div className="form">
        <h3>Salut !</h3>
        <p>Comment veux tu qu'on t'appelle ?</p>

        <label >Pseudo</label>
        <input type="text" value={UserName} onChange={handleChange} />

        <button disabled={!isValid} className="form-btn" onClick={() => { navigate('/waiting') }} >
          {!isValid ?
          <Fragment>
          <span role='img' aria-label="rocket">🚀</span>
          <span>GO</span>
          <span role='img' aria-label="rocket">🚀</span>
        </Fragment>
        :
        <Fragment>
            <span role='img' aria-label="rocket">😔</span>
            <span>Go</span>
            <span role='img' aria-label="rocket">😔</span>
          </Fragment>}
          
        </button>
      </div>
    </div>
  );

}
