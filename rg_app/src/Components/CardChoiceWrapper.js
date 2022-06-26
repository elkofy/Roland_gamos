import React,{ Component } from "react";
import CardChoice from "./CardChoice";
import Ou from "./Ou";
class CardChoiceWrapper extends Component {
    render() {
        return (
        <div className="CardChoice-wrapper">
            <CardChoice isBot="true" className="CardChoiceClass"></CardChoice>
            <Ou className="Ouclass"></Ou>
            <CardChoice className="CardChoiceClass"></CardChoice>
        </div>)
        }
}
export default CardChoiceWrapper;