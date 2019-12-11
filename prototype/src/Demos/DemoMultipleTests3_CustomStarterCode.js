import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import BlocklyKarel from '../Components/Editor/BlocklyKarel.js'
import KarelWorld from '../Components/Karel/KarelWorld.js'
import KarelGoal from '../Components/Karel/KarelGoal.js'
import KarelEngine from '../Components/Karel/KarelEngine.js'
import KarelStepEngine from '../Components/Karel/KarelEngine.js'

class DemoMultipleTests3_CustomStarterCode extends Component {

  componentWillMount() {
    this.engine = new KarelEngine()
    this.setState({
      isReset:true
    })
    this.initialXml = '<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="30" y="30"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"></block></next></block></statement></block></xml>';
    this.showToolbox = false;
  }

  reset() {
    this.refs.world.reset(() => {
      this.setState({
        isReset:true
      })
    })
  }

  run() {
    this.setState({
      isReset:false
    }, () => {
      let isValid = this.engine.runCode(this.refs.world, this.refs.editor)
      if(!isValid) {
        this.setState({
          isReset:true
        })
      }
    })
  }

  step() {
    this.engine.step(this.refs.world, this.refs.editor)
    this.setState({
      isReset:false
    })
  }

  renderRunResetButton() {
    if(this.state.isReset) {
      return <Button style={{height:64}}className="ideButton" size="lg" onClick = {() => this.run()}>Run</Button>
    } else {
      return <Button style={{height:64}}className="ideButton" size="lg" onClick = {() => this.reset()}>Reset</Button>
    }
  }

  render() {
    return (
      <div className="horizontal" >
        <div style={{width:500, height:560, marginRight:40}}>
          <BlocklyKarel 
            ref="editor"
            initialXml={this.initialXml}
            toolboxPresent={this.showToolbox}
          />
        </div>
        <div >
          {/* worlds */}
          <div className="multipleWorlds">
            {/* world that is running */}
            <div className="vertical">
              <div className="horizontal" >
                <div style={{marginRight:40}}>
                  <h3>World:</h3>
                  <KarelWorld 
                    width = {260}
                    height = {65}
                    nRows = {1}
                    nCols = {4}
                    ref="world"
                  />   
                </div> 
                <div>
                  <h3>Goal:</h3>
                  <KarelGoal
                    width = {260}
                    height = {65}
                    nRows = {1}
                    nCols = {4}
                    karelRow = {0}
                    karelCol={3}
                  />
                </div>
              </div>
              <div style={{marginTop:40}}>
                {this.renderRunResetButton()}
                <Button 
                  className="ideButton"
                  size="lg" 
                  variant="info"
                  onClick = {() => this.step()}
                  style={{height:64}}
                >Step</Button>
              
                <Button
                  variant="outline-secondary"
                >
                  <div class="horizontal" style={{alignItems:'center'}}>
                    <span style={{marginRight:5}}>Change World:</span>
                    <KarelGoal 
                      key = {'someTest'}
                      width = {150}
                      height = {50}
                      nRows = {1}
                      nCols = {3}
                      karelCol = {-1.45}
                    />  
                    <span style={{width:10}}/>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                </Button>
                
              </div>
            </div>
          </div>
          
          <br/>    
        </div>
      </div>
    )
  }

}

export default DemoMultipleTests3_CustomStarterCode