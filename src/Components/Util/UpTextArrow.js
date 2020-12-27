

import React from 'react';
import upArrow from './images/upArrow.png'
import './textArrow.css'


class UpTextArrow extends React.Component {

  render() {
    return <span className="upTextArrowContainer">
      <img className="upArrow" src={upArrow} />
      {this.renderText()} 
    </span>
  }

  renderText() {
    return <div className="textBox">
      {this.props.text}
    </div>
  }
  
}

export default UpTextArrow
