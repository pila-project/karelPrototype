import React, { Component } from 'react';
import { connect } from 'react-redux';
import { problemComplete, preItemComplete, postItemComplete, updateCode, updateCurrentView, updateItem, runCode, runDone, timedOut, updateCountdown } from 'redux/actions'
import { selectCodeByCurrentView } from 'redux/selectors';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Swal from 'sweetalert2'
import {fireSuccessSwal} from 'Components/Util/SuccessSwal.js'
import BlocklyKarel from '../Editor/BlocklyKarel.js'
import KarelWorld from '../Karel/KarelWorld.js'
import KarelGoal from '../Karel/KarelGoal.js'
import KarelEngine from '../Karel/KarelEngine.js'
import Curriculum from 'Curriculum/Curriculum.js'
import {translate} from 'redux/translator.js'

import  ClockRender from '../Util/countdownTimer.js'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {faPlay} from '@fortawesome/free-solid-svg-icons'
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons'
import {faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'

const mapDispatchToProps = {
  onUpdateCode: (codeUpdate) => updateCode(codeUpdate),
  onRunCode: (runData) => runCode(runData),
  onUpdateCurrentView: (view) => updateCurrentView(view),
  onUpdateItem: (item) => updateItem(item),
  onProblemComplete: (item) => problemComplete(item),
  onPreItemComplete: () => preItemComplete(),
  onPostItemComplete: (index) => postItemComplete(index),
  onRunDone: (correct) => runDone(correct),
  onTimeOut: () => timedOut(),
  onUpdateCountdown: (time) => updateCountdown(time)
};

const mapStateToProps = (state, ownProps) => {
  const moduleName = state.module
  const savedXml = selectCodeByCurrentView(state);
  const studentState = state.studentState;
  const currentView = state.currentView;
  const countdown = state.countdown;
  const item = state.item;
  return { studentState , currentView, savedXml, countdown, item, moduleName};
}

const SPACE_FLOAT = 20
const SPACING = SPACE_FLOAT + 'px'

class IdeItem extends Component {

  static defaultProps = {
    hasRun: true,
    hasStep: false,
    postWorld: null,
    isEditable: true,
    testStage:'learning',
    enableKeys: true
  }

  constructor(props){
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateClock = this.updateClock.bind(this);
    this.onCountdownEnd = this.onCountdownEnd.bind(this);
  }

  componentWillMount() {
    this.engine = new KarelEngine()
    this.setState({
      isReset: true
    })

    if (this.props.countdown[this.props.item] < 1) {
      this.setState({
        isEditable: false
      })
    }

    this.LearnModule = new Curriculum(this.props.moduleName)

  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount(){
    this.engine.stop();
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  goHome() {
    this.goToItem('dashboard')
    this.props.onUpdateItem('dashboard')
  }

  goToItem(itemId) {
    this.props.onUpdateCurrentView(itemId)
  }

  reset() {
    this.engine.stop();
    this.refs.world.reset(() => {
      this.setState({
        isReset:true
      })
    })

    let resetData = {
      runType: 'reset'
    }
    this.props.onRunCode(resetData)
  }

  run() {
    let codeText = this.refs.editor.getCode()
    this.setState({
      isReset:false
    }, () => {
      // Replacing `let engine` with `this.engine` to get `this.engine.stop()` working
      // let engine = new KarelEngine()
      let isValid = this.engine.runCode(this.refs.world, this.refs.editor, () => this.onRunDone())
      if(!isValid) {
        this.setState({
          isReset:true
        })
      }
    })

    let codeHTML = this.refs.editor.getHTMLCode()
    let runData = {
      runType: 'run',
      code: codeHTML
    }
    this.props.onRunCode(runData)
  }

  step() {
    this.engine.step(this.refs.world, this.refs.editor)
    this.setState({
      isReset:false
    })

    let codeHTML = this.refs.editor.getHTMLCode()
    let stepData = {
      runType: 'step',
      code: codeHTML
    }
    this.props.onRunCode(stepData)

  }

  updateClock(time) {
    var time_obj = {}
    time_obj[this.props.item] = time
    this.props.onUpdateCountdown(time_obj)
  }

  // returns false if it is an example
  isStudentItem() {
    if(this.props.testStage != 'learning') {
      return true
    }
    let itemType = this.LearnModule.getItemType(this.props.currentView)
    return itemType === 'challenge'
  }

  onRunDone() {
    // if this was a "challenge", then check if the solution
    // was correct!
    if(this.isStudentItem()) {
      let goalState = this.refs.goalWorld.getWorldState()
      let postState = this.refs.world.getWorldState()
      let correct = KarelWorld.stateEquals(postState, goalState)

      this.props.onRunDone(correct)

      if(correct) {
        this.onSolution()
      } else {
        this.onIncorrect()
      }
    }
  }

  onIncorrect() {
    Swal.fire({
      title: translate('Not quite!'),
      icon: 'warning',
      toast:true,
      allowOutsideClick:true,
    }).then((result) => {
      if (result.value) {
        // nothing todo
      }
    })
  }

  onSolution() {
    var onDone = () => this.props.onPreItemComplete(null)
    if (this.props.item == 'Challenge') {
      onDone = () => this.props.onPostItemComplete(-1)
    } else if(this.props.testStage == 'learning') {
      onDone = () => this.props.onProblemComplete(this.props.item)
    }

    fireSuccessSwal(onDone)
  }

  onCountdownEnd() {
    if (this.props.item == 'Challenge') {
      this.props.onPostItemComplete(-1)
    } else if(this.props.testStage == 'learning') {
      this.props.onTimeOut()
    }
  }

  handleKeyPress(e) {
    let key = e.key
    if(key == 'ArrowUp' && this.props.enableKeys) {
      this.onSolution()
    }
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
      return <Button className="ideButton wideButton" size="lg" onClick = {() => this.run()}>
        <FontAwesomeIcon icon={faPlay}/> &nbsp;{translate('Run')}
      </Button>
    } else {
      return <Button className="ideButton wideButton" size="lg" onClick = {() => this.reset()}>
        <FontAwesomeIcon icon={faSyncAlt}/> &nbsp; {translate('Reset')}
      </Button>
    }
  }

  getInstructionColor(itemType){
    if(itemType == 'goodExample') {
      return 'instructionGreen'
    }
    if(itemType == 'badExample') {
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
    let itemType = this.LearnModule.getItemType(currentItemId)
    let classColor = this.getInstructionColor(itemType)
    return (
      <div className={"instructionBox " + classColor} style={{width:width}}>
        {this.props.instructions}
      </div>
    )
  }

  renderPre() {
    return (
      <div style={{marginRight:SPACING}}>
        <h3>{translate('World')}:</h3>
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
          <h3>{translate('Goal')}:</h3>
          <KarelGoal
            {...this.props.postWorld}
            ref="goalWorld"
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

  saveCode(codeUpdate) {
    // codeUpdate = {code: code-xml, runType: type of action that resulted in the code}
    this.props.onUpdateCode(codeUpdate)
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
          savedXml = {this.props.savedXml}
          initialXml = {this.props.initialXml}
          isEditable={this.state.isEditable ? this.props.isEditable : this.state.isEditable}
          hideBlocks = {this.props.hideBlocks}
          activateToolbox = {this.props.activateToolbox}
          onCodeChange = {(e) => this.saveCode(e)}
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
    if(this.props.testStage != 'learning') {
      return <span />
    }

    return (
      <div className="navContainer" style={{height:'40px',
        width:this.calculateLeftWidth(),
        'margin-bottom':SPACING
      }}>
        <div className="navItem">
          <span>
            <Button variant="light" onClick={() => this.goHome()} >
              <FontAwesomeIcon style={{'font-size':'30px'}}icon={faHome} />
            </Button>
          </span>
        </div>
        <div className="navItem" style={{flex:2}}>
          <span>
            {this.renderExampleToggle()}
          </span>
        </div>
        <div className="navItem">
          <span className="countdown" style={{'flex':'2', 'min-width': '100px'}}>
            {<FontAwesomeIcon icon={faClock} /> }
            <ClockRender countdown = {this.props.countdown[this.props.item]} onCountdownEnd = {this.onCountdownEnd} updateClock = {this.updateClock}/>
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
    let problem = this.LearnModule.getProblemFromId(currentItemId)
    let activeKey = this.LearnModule.getItemType(currentItemId)

    if ('goodExample' in problem || 'badExample' in problem) {

      return (
        <Nav variant="tabs" size="lg" activeKey={activeKey}>
          <Nav.Item>
            <Nav.Link
              eventKey="challenge"
              onClick={() => this.goToItem(problem['challenge'])}>
              <FontAwesomeIcon icon={faPuzzlePiece} />
              &nbsp;{translate('Challenge')}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="goodExample"
              onClick={() => this.goToItem(problem['goodExample'])}>
              <FontAwesomeIcon icon={faCheck} /> {translate('Example')}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="badExample"
              onClick={() => this.goToItem(problem['badExample'])}>
              <FontAwesomeIcon icon={faTimes} /> {translate('Example')}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )
    } else {
      return (
        <Nav variant="tabs" size="lg" activeKey={activeKey}>
          <Nav.Item>
            <Nav.Link
              eventKey="challenge"
              onClick={() => this.goToItem(problem['challenge'])}>
              <FontAwesomeIcon icon={faPuzzlePiece} />
              &nbsp;{translate('Challenge')}</Nav.Link>
          </Nav.Item>
        </Nav>
      )
    }

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
