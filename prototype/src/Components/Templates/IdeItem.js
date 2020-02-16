import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStatus, updateCode, updateCurrentView } from 'redux/actions'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import BlocklyKarel from '../Editor/BlocklyKarel.js'
import KarelWorld from '../Karel/KarelWorld.js'
import KarelGoal from '../Karel/KarelGoal.js'
import KarelEngine from '../Karel/KarelEngine.js'
import Curriculum from 'Curriculum/SimpleCurriculum.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {faPlay} from '@fortawesome/free-solid-svg-icons'
import {faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'

const mapDispatchToProps = {
  onUpdateCode: (code) => updateCode(code),
  onUpdateCurrentView: (view) => updateCurrentView(view)
};

const mapStateToProps = (state, ownProps) => {
  const studentState = state.studentState;
  const currentView = state.currentView;
  return { studentState , currentView };
}

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

  goHome() {
    this.goToItem('dashboard')
  }

  goChallenge() {
    let currentItemId = this.props.currentView
    let item = Curriculum.getItemFromId(currentItemId)
    this.goToItem(item['challenge'])
  }

  goGoodExample() {
    let currentItemId = this.props.currentView
    let item = Curriculum.getItemFromId(currentItemId)
    this.goToItem(item['goodExample'])
  }

  goBadExample() {
    let currentItemId = this.props.currentView
    let item = Curriculum.getItemFromId(currentItemId)
    this.goToItem(item['badExample'])
  }

  goToItem(itemId) {
    this.props.onUpdateCurrentView(itemId)
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
      return <Button className="ideButton" size="lg" onClick = {() => this.run()}>
        <FontAwesomeIcon icon={faPlay}/> &nbsp;Run
      </Button>
    } else {
      return <Button className="ideButton" size="lg" onClick = {() => this.reset()}>Reset</Button>
    }
  }

  getInstructionColor(item){
    if(item['isGoodExample']) {
      return 'instructionGreen'
    }
    if(item['isBadExample']) {
      return 'instructionRed'
    }
    return 'instructionBlue'
  }

  renderInstructions() {
    let width = this.calculateLeftWidth()
    if(!('instructions' in this.props)) {
      return <span/>
    }
    let currentItemId = this.props.currentView
    let item = Curriculum.getItemFromId(currentItemId)
    let classColor = this.getInstructionColor(item)
    return (
      <div className={"instructionBox " + classColor} style={{width:width}}>
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
            <FontAwesomeIcon onClick={() => this.goHome()} style={{'font-size':'30px'}}icon={faHome} />
          </span>
        </div>
        <div className="navItem" style={{flex:2}}>
          <span>
            {this.renderExampleToggle()}
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

  getActiveKey(item) {
    if('isGoodExample' in item) {
      return 'good'
    }
    if('isBadExample' in item) {
      return 'bad'
    }
    return 'challenge'
  }

  renderExampleToggle() {
    let currentItemId = this.props.currentView
    let item = Curriculum.getItemFromId(currentItemId)
    let activeKey = this.getActiveKey(item)

    return (
      <Nav variant="tabs" size="lg" activeKey={activeKey}>
        <Nav.Item>
          <Nav.Link eventKey="challenge" onClick={() => this.goChallenge()}>
            <FontAwesomeIcon icon={faPuzzlePiece} />
            &nbsp;Challenge</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="good" onClick={() => this.goGoodExample()}>
            <FontAwesomeIcon icon={faCheck} /> Example</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="bad" onClick={() => this.goBadExample()}>
            <FontAwesomeIcon icon={faTimes} /> Example
          </Nav.Link>
        </Nav.Item>
      </Nav>
    )
    // // there are a few states in this button:
    // // if the item has an example, show it
    // // if the item "is" an example, show a button to
    // // take you back to its problem. Examples to problems
    // // must be 1:1
    // let currentItemId = this.props.currentView
    // let item = Curriculum.getItemFromId(currentItemId)
    // let hasExample = 'example' in item
    // // case 1: its a problem with an example
    // if(hasExample) {
    //   let exampleId = item['example']
    //   return (
    //     <Button variant="outline-primary" onClick={() => this.goToItem(exampleId)}>
    //       Show Example
    //     </Button>
    //   )
    // } 
    // // case 2: its an example with a problem
    // let isExample = 'isExample' in item && item['isExample']
    // if(isExample) {
    //   let problemId = item['problem']
    //   return (
    //     <Button variant="outline-success" onClick={() => this.goToItem(problemId)}>
    //       Show Challenge
    //     </Button>
    //   )
    // }
  }

  calculateLeftWidth() {
    var width = parseFloat(this.props.preWorld.width)
    if(this.props.postWorld != null) {
      width += parseFloat(this.props.postWorld.width)
      width += SPACE_FLOAT
    }
    return Math.max(width, 620)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdeItem)