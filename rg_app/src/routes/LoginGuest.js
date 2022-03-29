import { Component } from "react";


export default class LoginGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  redirectToRoom = () => {
    window.location.href = "/Join/";
    localStorage.setItem("User", this.state.User);
  }
  handleChange(event) {
    this.setState({ User: event.target.value });
  }
  render() {


    return (
      <div className="LoginForm">
        <div className="formulaire">
          <label>Entrez votre nom</label>
          <input type="text" value={this.state.User} onChange={this.handleChange} />
          <button className="form_Btn" onClick={this.redirectToRoom}  >🚀 GO 🚀</button>
        </div>
      </div>
    );
  }
}
