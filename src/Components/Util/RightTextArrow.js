

import React from 'react';
import rightArrow from './images/rightArrow.png'
import './textArrow.css'


class TextArrow extends React.Component {

  render() {
    return <span className="textArrowContainer">
      {this.renderText()}
      <img className="rightArrow" src={rightArrow} />
    </span>
  }

  renderText() {
    return <div className="textBox">
      {this.props.text}
    </div>
  }
  
}

export default TextArrow
