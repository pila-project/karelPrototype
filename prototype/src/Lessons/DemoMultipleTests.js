import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import BlocklyKarel from '../Components/Editor/BlocklyKarel.js'
import KarelWorld from '../Components/Karel/KarelWorld.js'
import KarelGoal from '../Components/Karel/KarelGoal.js'
import KarelEngine from '../Components/Karel/KarelEngine.js'

class DemoMultipleTests extends Component {

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
      let isValid = engine.runCode(codeText, this.refs.world)
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
      <div className="horizontal" id="test" >
        <div style={{width:500, height:'100%', marginRight:40}}>
          <BlocklyKarel 
            ref="editor"
          /><br/>
          <div>
            {this.renderRunResetButton()}
            <Button 
              className="ideButton"
              size="lg" 
              variant="info"
              onClick = {() => this.step()}>Step</Button>
          </div>
        </div>
        <div>
          
          <div className="horizontal" style={{marginTop:20}}>
            <div style={{marginRight:40}}>
              <h3>World:</h3>
              <KarelWorld 
                width = {260}
                height = {260}
                nRows = {4}
                nCols = {4}
                stones = {[
                  {r:0,c:1,n:1},
                  {r:2,c:0,n:1},
                  {r:3,c:2,n:1},
                  {r:2,c:3,n:1},
                ]}
                ref="world"
              />   
            </div> 
            <div>
              <h3>Goal:</h3>
              <KarelGoal
                width = {260}
                height = {260}
                nRows = {4}
                nCols = {4}
                karelRow = {0}
                karelCol={3}
              />
            </div>
          </div>
          
          <br/>    
        </div>
      </div>
    )
  }

}

export default DemoMultipleTests