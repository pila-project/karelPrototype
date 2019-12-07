import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import lessonList from '../../Lessons/LessonList.js'

import Logo from "../../Img/stanford-black.png";

class LearnNav extends Component {
 
  getButton(value, index) {
    if(index == this.props.levelIndex) {
      return (
        <button 
          className="selectedLevelNav"
          title={lessonList[index]['name']}
          alt={lessonList[index]['name']}
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
          <a>Pisa 2024</a>
          <div className="breadcrumbContainer">
            {lessonList.map((value, index) => {
              return this.getButton(value, index)
            })}
          </div>
          <a>I finished!</a>
        </div>
        <div className="rightNav">
          <a>About</a>
        </div>
      </div>
    )
  }
}

export default LearnNav