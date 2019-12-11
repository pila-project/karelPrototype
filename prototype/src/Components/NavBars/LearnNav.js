import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LearnNav.css'
import Logo from "../../Img/stanford-black.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

class LearnNav extends Component {

  static defaultProps = {
    lockedIndex:Infinity
  }

  renderSelected(value, index){
    return <button 
      className="selectedLevelNav"
      key = {index}
      title={this.props.list[index]['name']}
      alt={this.props.list[index]['name']}
      data-toggle="tooltip"
      data-placement="bottom"
    >
      {index + 1}
    </button>
  } 

  renderUnselected(value, index) {
    return <button 
      className="levelNav" 
      key={index} 
      title={value['name']}
      alt={value['name']}
      data-toggle="tooltip"
      data-placement="bottom"
      onClick = {() => this.props.changeLevel(index)}
    />
  }

  renderLocked(value, index) {
    return <FontAwesomeIcon 
      key={index} 
      icon={faLock} 
      className="levelLock"
    />
  }
 
  renderButton(value, index) {
    if(index == this.props.levelIndex) {
      return this.renderSelected(value, index)
    }

    if(index >= this.props.lockedIndex) {
      return this.renderLocked(value, index)
    }

    return this.renderUnselected(value, index)
  }

  render() {

    return (
      <div className="learnNav">
        <img src={Logo} className="logo"/>
        <div className="middleNav">
          <a>{this.props.name}</a>
          <div className="breadcrumbContainer">
            {this.props.list.map((value, index) => {
              return this.renderButton(value, index)
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