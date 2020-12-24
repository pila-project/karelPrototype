

import React from 'react';
import upLeftArrow from './images/upLeftArrow.png'
import './textArrow.css'


class TextArrow extends React.Component {

  render() {
    return <span className="upTextArrowContainer">
      <img className="upLeftArrow" src={upLeftArrow} />
      {this.renderText()} 
    </span>
  }

  renderText() {
    return <div className="textBox">
      {this.props.text}
    </div>
  }
  
}

export default TextArrow
