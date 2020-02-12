import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import BlocklyKarel from '../Editor/BlocklyKarel.js'
import KarelWorld from '../Karel/KarelWorld.js'
import KarelGoal from '../Karel/KarelGoal.js'
import KarelEngine from '../Karel/KarelEngine.js'



class IdeItem extends Component {

  static defaultProps = {
    hasRun: true,
    hasStep: false,
    postWorld: null,
    isEditable:true
  }

  componentWillMount() {
    this.engine = new KarelEngine()
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

  step() {
    this.engine.step(this.refs.world, this.refs.editor)
    this.setState({
      isReset:false
    })
  }

  renderButtons() {
    let buttons = []
    if(this.props.hasRun) {
      buttons.push(this.renderRunResetButton())
    }
    if(this.props.hasStep){
      buttons.push(this.renderStepButton())
    }
    return <div>{buttons}</div>
  }

  renderStepButton() {
    return <Button 
      className="ideButton"
      size="lg" 
      variant="info"
      onClick = {() => this.step()}
    >Step</Button>
  }

  renderRunResetButton() {
    if(this.state.isReset) {
      return <Button className="ideButton" size="lg" onClick = {() => this.run()}>Run</Button>
    } else {
      return <Button className="ideButton" size="lg" onClick = {() => this.reset()}>Reset</Button>
    }
  }

  renderInstructions() {
    if(!('instructions' in this.props)) {
      return <span/>
    }
    return (
      <div className="instructionBox">
        {this.props.instructions}
      </div>
    )
  }

  renderPost() {
    if(this.props.postWorld != null){
      return (
        <div>
          <h3>Goal:</h3>
          <KarelGoal
            {...this.props.postWorld}
          />
        </div>
      )
    }
    return <div/>
    
  }

  render() {
    return (
      <div className="horizontal">
        <div style={{width:500, height:560, marginRight:40}}>
          <BlocklyKarel 
            ref="editor"
            initialXml = {this.props.initialXml}
            toolboxPresent={this.props.isEditable}
          />
          
        </div>
        <div className = "vertical">
          {this.renderInstructions()}
          <div className="horizontal">
            <div style={{marginRight:40}}>
              <h3>World:</h3>
              <KarelWorld 
                {...this.props.preWorld}
                ref="world"
              />   
            </div> 
            {this.renderPost()}
          </div>
          <div style={{marginTop:20}}>
            {this.renderButtons()}
          </div>  
        </div>
      </div>
    )
  }
}

export default IdeItem