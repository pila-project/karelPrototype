import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import BlocklyKarel from '../Editor/BlocklyKarel.js'
import KarelWorld from '../Karel/KarelWorld.js'
import KarelGoal from '../Karel/KarelGoal.js'
import KarelEngine from '../Karel/KarelEngine.js'

class IdeSingleWorldNoStep extends Component {

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
      let isValid = engine.runCode(this.refs.world, this.refs.editor)
      if(!isValid) {
        this.setState({
          isReset:true
        })
      }
    })
  }

  renderRunResetButton() {
    if(this.state.isReset) {
      return <Button className="ideButton" size="lg" onClick = {() => this.run()}>Run</Button>
    } else {
      return <Button className="ideButton" size="lg" onClick = {() => this.reset()}>Reset</Button>
    }
  }

  render() {
    return (
      <div className="horizontal">
        <div style={{width:500, height:560, marginRight:40}}>
          <BlocklyKarel 
            ref="editor"
          />
          
        </div>
        <div className = "vertical">

          <div className="horizontal">
            <div style={{marginRight:40}}>
              <h3>World:</h3>
              <KarelWorld 
                {...this.props.preWorld}
                ref="world"
              />   
            </div> 
            <div>
              <h3>Goal:</h3>
              <KarelGoal
                width = {260}
                height = {260}
                nRows = {2}
                nCols = {2}
                walls = {[
                  {r:1,c:0,d:'North'}
                ]}
                karelRow = {0}
                karelDir = {'West'}
              />
            </div>
          </div>
          <div style={{marginTop:20}}>
            {this.renderRunResetButton()}
          </div>  
        </div>
      </div>
    )
  }
}

export default IdeSingleWorldNoStep