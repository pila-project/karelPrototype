import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import BlocklyKarel from '../Editor/BlocklyKarel.js'
import KarelWorld from '../Karel/KarelWorld.js'
import KarelGoal from '../Karel/KarelGoal.js'
import KarelEngine from '../Karel/KarelEngine.js'

class GuessPost extends Component {
  render() {
    return (
      <div className="vertical centered">
        <div className="horizontal centered">
          <div>
            <h3>Code:</h3>
            <img className="guessImg"src={this.props.img}/>
          </div>
          <div>
            <h3>World:</h3>
            <KarelWorld {...this.props.world} />
          </div>
        </div>
        <div style={{height:50}} />
        <h3>What is the result of running the code on the world?</h3>
        <div class="worldGuesses">
          <KarelWorld {...this.props.a} />
          <KarelWorld {...this.props.b} />
          <KarelWorld {...this.props.c} />
          <KarelWorld {...this.props.d} />
          <KarelWorld {...this.props.e} />
        </div>
      </div>

    )
  }
}

export default GuessPost