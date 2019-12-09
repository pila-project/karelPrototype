import React, { Component } from 'react';
import './style/karel.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import BlocklyKarel from '../Editor/BlocklyKarel.js'
import KarelWorld from './KarelWorld.js'
import KarelEngine from './KarelEngine.js'

class KarelIde extends Component {

  componentWillMount() {
    this.setState({
      isReset:true
    })
  }

  reset() {
    this.refs.world.reset(() => {
      this.setState({
        isReset:true
      })
    })
  }

  run() {
    let codeText = this.refs.editor.getCode()
    this.setState({
      isReset:false
    }, () => {
      let engine = new KarelEngine()
      engine.runCode(codeText, this.refs.world, this.refs.editor)
    })
  }

  renderRunResetButton() {
    if(this.state.isReset) {
      return <Button onClick = {() => this.run()}>Run</Button>
    } else {
      return <Button onClick = {() => this.reset()}>Reset</Button>
    }
  }

  render() {
    return (
      <div className="horizontal centered" id="test" >
        <div style={{width:500}}>
          <BlocklyKarel 
            ref="editor"
          />
        </div>
        <div>
          {this.renderRunResetButton()}
          <br/>
          <KarelWorld 
            width = {200}
            height = {200}
            nRows = {this.props.nRows}
            nCols = {this.props.nCols}
            walls = {this.props.walls}
            ref="world"
          />
          
        </div>
      </div>
    )
  }
}

export default KarelIde