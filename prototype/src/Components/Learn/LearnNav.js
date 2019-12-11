import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from "../../Img/stanford-black.png";

class LearnNav extends Component {
 
  getButton(value, index) {
    if(index == this.props.levelIndex) {
      return (
        <button 
          className="selectedLevelNav"
          key = {index}
          title={this.props.list[index]['name']}
          alt={this.props.list[index]['name']}
          data-toggle="tooltip"
          data-placement="bottom"
        >
          {index + 1}
        </button>
      )
    }

    return (
      <button 
        className="levelNav" 
        key={index} 
        title={value['name']}
        alt={value['name']}
        data-toggle="tooltip"
        data-placement="bottom"
        onClick = {() => this.props.changeLevel(index)}
      />
    )
  }

  render() {

    return (
      <div className="learnNav">
        <img src={Logo} className="logo"/>
        <div className="middleNav">
          <a>{this.props.name}</a>
          <div className="breadcrumbContainer">
            {this.props.list.map((value, index) => {
              return this.getButton(value, index)
            })}
          </div>
        </div>
        <div className="rightNav">
          <a>{this.props.rightText}</a>
        </div>
      </div>
    )
  }
}

export default LearnNav