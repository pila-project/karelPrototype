import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import BlocklyKarel from '../Editor/BlocklyKarel.js'
import KarelWorld from '../Karel/KarelWorld.js'
import KarelGoal from '../Karel/KarelGoal.js'
import KarelEngine from '../Karel/KarelEngine.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

const SPACE_FLOAT = 20
const SPACING = SPACE_FLOAT + 'px'

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
    let width = this.calculateLeftWidth()
    if(!('instructions' in this.props)) {
      return <span/>
    }
    return (
      <div className="instructionBox" style={{width:width}}>
        {this.props.instructions}
      </div>
    )
  }

  renderPre() {
    return (
      <div style={{marginRight:SPACING}}>
        <h3>World:</h3>
        <KarelWorld 
          {...this.props.preWorld}
          ref="world"
        />   
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
      <div className="horizontal fullSize" style={{padding:SPACING}}>
        {this.renderLeftSide()}
        <div style={{'min-width':'10px', 'width':SPACING}} />
        {this.renderRightSide()}
      </div>
    )
  }

  renderRightSide() {
    return (
      <div className="editorContainer" style = {{
        'min-width': '400px',
        'flex-grow': '1',
        'height':'100%',
        'min-height':'500px'
      }}>
        <BlocklyKarel 
          ref="editor"
          initialXml = {this.props.initialXml}
          isEditable={this.props.isEditable}
          hideBlocks = {this.props.hideBlocks}
        />
        
      </div>
    )
  }

  renderLeftSide() {
    return (
      <div className = "vertical">
        {this.renderNavBar()}
        {this.renderInstructions()}
        <div className="horizontal">
          {this.renderPre()}
          {this.renderPost()}
        </div>
        <div style={{marginTop:SPACING}}>
          {this.renderButtons()}
        </div>  
      </div>
    )
  }

  renderNavBar() {
    return (
      <div className="navContainer" style={{height:'40px',
        width:this.calculateLeftWidth(),
        'margin-bottom':SPACING
      }}>
        <div className="navItem">
          <span>
            <FontAwesomeIcon style={{'font-size':'30px'}}icon={faHome} />
          </span>
        </div>
        <div className="navItem">
          <span>
            {this.renderExampleChoser()}
          </span>
        </div>
        <div className="navItem">
          <span>
            <FontAwesomeIcon style={{'font-size':'30px'}}icon={faClock} /> 30mins
          </span>
        </div>   
      </div>
    )
  }

  onExampleChosen(e) {
    alert(e)
  }

  renderExampleChoser() {
    return (
      <DropdownButton 
        variant="outline-primary"
        title="Show Worked Example">
        <Dropdown.Item 
          onClick = {() => this.onExampleChosen('a')}
        >Good Example</Dropdown.Item>
        <Dropdown.Item 
          onClick = {() => this.onExampleChosen('b')}
        >Bad Example</Dropdown.Item>
      </DropdownButton>
    )
  }

  calculateLeftWidth() {
    var width = parseFloat(this.props.preWorld.width)
    if(this.props.postWorld != null) {
      width += parseFloat(this.props.postWorld.width)
      width += SPACE_FLOAT
    }
    return Math.max(width, 500)
  }
}

export default IdeItem