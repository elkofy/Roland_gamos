import React, { Component } from "react";
import logo from '../res/Rg_logo.svg';

class Header extends Component {
  render() {
    return (
    <div className={this.props.className}>
    <img src={logo}  alt="logo" className="logo" />
    <p>La règle : Un nom de rappeur est proposé il faut donner un chanteur avec qui le rappeur cité à fait un feat etc ... </p>
    </div>
);
  }
}

export default Header;
