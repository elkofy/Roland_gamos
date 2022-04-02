import React, { Component } from "react";
import cardlogo1 from "../res/cardlogo1.svg";
import cardlogo2 from "../res/cardlogo2.svg";

class CardChoice extends Component {
  render() {
    var isBot = this.props.isBot;
    let cardlogo = cardlogo2;
    isBot ? (cardlogo = cardlogo1) : (cardlogo = cardlogo2);
    return (
      <div className={this.props.className}>
        
        <div className="innerCardclass" >
          <a href = { isBot ? "/": "/loginguest"} >
          <img src={cardlogo} alt="logo" className="cardlogoclass" />
          {isBot ? (
            <div className="cardplaceholderclass" >Jouer contre un bot</div>
          ) : (
            <div className="cardplaceholderclass">
              Jouer avec des amis
            </div>
          )}</a>
          <div> </div>
        </div>
      </div>
    );
  }
}

export default CardChoice;
