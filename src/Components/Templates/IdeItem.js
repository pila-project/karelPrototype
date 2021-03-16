import React, { Component } from 'react';
import { connect } from 'react-redux';
import { problemComplete, preItemComplete, postItemComplete, updateCode, updateCurrentView, updateItem, runCode, runDone, timedOut, updateCountdown, updateWorld } from 'redux/actions'
import { selectCodeByCurrentView } from 'redux/selectors';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
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
  onUpdateCountdown: (time) => updateCountdown(time),
  onUpdateWorld: (world, solvedWorlds) => updateWorld(world, solvedWorlds)
};

const mapStateToProps = (state, ownProps) => {
  const moduleName = state.module;
  var pageState = state[moduleName];
  const savedXml = selectCodeByCurrentView(pageState);
  const studentState = pageState.studentState;
  const currentView = pageState.currentView;
  const countdown = pageState.countdown;
  const item = pageState.item;
  const world = currentView in studentState ? studentState[currentView].world : false;
  const solvedWorlds = currentView in studentState ? studentState[currentView].solvedWorlds : false;
  return { studentState , currentView, savedXml, countdown, item, moduleName, world, solvedWorlds};
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
    enableKeys: true,
    multiWorlds: false
  }

  constructor(props){
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateClock = this.updateClock.bind(this);
    this.onCountdownEnd = this.onCountdownEnd.bind(this);
  }

  componentWillMount() {
    this.engine = new KarelEngine()
    var isReset = true

    var isEditable = true
    if (this.props.countdown[this.props.item] < 1) {
      isEditable = false

    }

    this.LearnModule = new Curriculum(this.props.moduleName)

    // Multiple worlds to be solved?
    var multiWorlds = true
    var solvedWorlds = {}
    if ('width' in this.props.preWorld || Object.keys(this.props.preWorld).length == 1) {
      multiWorlds = false

    } else {
      var solvedWorldsExist = false
      if (solvedWorlds in this.props) {
        if (Object.keys(this.props.solvedWorlds).length) {
          solvedWorldsExist = true
        }
      }

      switch(solvedWorldsExist) {
        case false:
          for (var key in this.props.preWorld) {
            solvedWorlds[key] = 0 // 0 ... hasn't run yet
          }
          break;

        case true:
          solvedWorlds = this.props.solvedWorlds
          break;
      }
    }

    this.setState({
      isEditable: isEditable,
      isReset: isReset,
      multiWorlds: multiWorlds,
      solvedWorlds: solvedWorlds,
    })

  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false);

    if (this.state.multiWorlds) {
      // Set up tracker of which worlds are solved
      this.resetWorldSelection()

    }

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

      if (!this.state.multiWorlds) {
        if(correct) {
          this.onSolution()
        } else {
          this.onIncorrect()
        }
      } else {
        this.onNextStep(correct)
      }
    }
  }

  onNextStep(correct) {
    var solvedWorlds = this.state.solvedWorlds
    // update tracker of worlds correct
    solvedWorlds[this.state.world] = [1,2][correct*correct] //0... hasn't run; 1 ... failed; 2... succeeded
    //correct = true
    var allWorldsCorrect = true
    Object.keys(solvedWorlds).map(key => {
      allWorldsCorrect = allWorldsCorrect * (solvedWorlds[key]==2) // 2 ... succeeded
    })

    var solutionState = correct + allWorldsCorrect // 2 ... completed; 1 ... correct world; 0 ... failed

    var responseType = ''
    var iconType = ''
    var confirmText = ''
    var cancelText = ''
    switch (solutionState) {
      case 2:
        responseType = translate('You solved all worlds!')
        iconType = 'success'
        confirmText = 'Return to the main menu.'
        cancelText = 'Stay in this task'
      break;

      case 1:
        responseType = translate(this.state.worldName + ' solved.')
        iconType = 'success'
        confirmText = 'Run next world'
        cancelText = 'Keep this world'
      break;

      case 0:
        responseType = translate(this.state.worldName + ' not solved.')
        iconType = 'warning'
        confirmText = 'Run next world'
        cancelText = 'Keep this world'

    }


      // Generate swall
    Swal.fire({
      title: responseType,
      icon: iconType,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      allowOutsideClick: true
    }).then((result) => {

      if (result.value) {
        if (solutionState == 2) {
          this.onSolution()

        } else {

          // Run the world that has not been run yet
          this.setState({
            solvedWorlds: solvedWorlds
          })
          // Find the next unsolved world
          var nextWorld = Object.keys(this.state.solvedWorlds)[0]
          var returnNext = false
          Object.keys(this.state.solvedWorlds).map((key,idx) => {
            if (returnNext && !(this.state.solvedWorlds[key]==2)) {
              nextWorld = key
              returnNext = false
            }
            if (key == this.state.world) returnNext = true
          })

          // Reset the code
          this.reset()

          // Update view to the identified world
          this.updateWorld(nextWorld)

          // Run the code once updated
          this.run()
        }
      } else {
        // Reset the code
        this.reset()
      }
    })

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

  resetWorlds() {
    var solvedWorlds = {}
    for (var key in this.props.preWorld) {
      solvedWorlds[key] = 0 // 0 ... hasn't run yet
    }

    this.props.onUpdateWorld(this.state.world, solvedWorlds)
    this.setState({
      solvedWorlds: solvedWorlds
    })

  }

  updateWorld(evt) {
    var newWorld = ''
    if (evt.target) {
      newWorld = evt.target.value
    } else {
      newWorld = evt
    }
    this.reset()
    this.props.onUpdateWorld(newWorld, this.state.solvedWorlds)
    this.setState({
      world: newWorld,
      worldName: newWorld ? 'World ' + newWorld.replace(/[^0-9]+/,'') : 'World 1'
    })
  }

  resetWorldSelection() {
    this.props.onUpdateWorld('world1', this.state.solvedWorlds)
    this.setState({
      world: 'world1',
      worldName: 'World 1'

    })
  }

  renderMultiWorldButtons() {

    var num_buttons = Object.keys(this.props.preWorld).length
    var button_focus = []
    Array.from({length: num_buttons}, (x, i) => i).map(idx => {
      button_focus.push('world' + (idx + 1))
    })

    var select_world = 'world1'
    if (this.state.world) {
      select_world = button_focus.find(elem => elem==this.state.world) ? this.state.world : "world1"
    }

    return <ToggleButtonGroup
      name='test'
      defaultValue={'world1'}
      value={select_world}
      onClick={(event) => this.updateWorld(event)}>
        {button_focus.map((button_idx,idx) =>
          <ToggleButton value={button_idx} variant={'solvedWorlds' in this.state? ['secondary','danger','success'][this.state.solvedWorlds[button_idx]] : 'secondary'}> {'World ' + (idx+1).toString()} </ToggleButton>
        )}
      </ToggleButtonGroup>
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

    var preWorld = null
    if (Object.keys(this.props.preWorld).length==1) {
      preWorld = this.props.preWorld[Object.keys(this.props.preWorld)[0]]
    } else if (!('width' in this.props.preWorld)) {

      if (this.props.world && this.props.world in this.props.preWorld) {
        preWorld = this.props.preWorld[this.props.world]
        preWorld['world'] = this.props.world
      } else {
        console.log('PROBLEM IN RENDER PRE')
        preWorld = this.props.preWorld[Object.keys(this.props.preWorld)[0]]
      }

    } else {
      preWorld = this.props.preWorld
    }

    return (
      <div style={{marginRight:SPACING}}>
        <h3>{translate('World')}:</h3>
        <KarelWorld
          {...preWorld}
          key={this.props.world}
          ref="world"
        />
      </div>
    )
  }

  renderPost() {

    if(this.props.postWorld != null){
      var postWorld = null
      if (Object.keys(this.props.postWorld).length==1) {
        postWorld = this.props.postWorld[Object.keys(this.props.postWorld)[0]]
      } else if (!('width' in this.props.postWorld)) {

        if (this.props.world && this.props.world in this.props.postWorld) {
          postWorld = this.props.postWorld[this.props.world]
          postWorld['world'] = this.props.world
        } else {
          console.log('PROBLEM IN RENDER POST')
          postWorld = this.props.postWorld[Object.keys(this.props.postWorld)[0]]
        }
      } else {
        postWorld = this.props.postWorld
      }

      return (
        <div >
          <h3>{translate('Goal')}:</h3>
          <KarelGoal
            {...postWorld}
            key={this.props.world}
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
    console.log('WE ARE HERE')
    this.resetWorlds()

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
          restrictedUse = {'restrictedUse' in this.props ? this.props.restrictedUse : {}}
        />

      </div>
    )
  }

  renderLeftSide() {

    if (!this.state.multiWorlds) {
      return (
        <div className = "vertical">
          {this.renderNavBar()}
          {this.renderInstructions()}
          <div className="horizontal">
            {this.renderPre()}
            {this.renderPost()}
          </div>
          <div style={{marginTop:SPACING}} className="horizontal-spaced">
            {this.renderButtons()}
          </div>
        </div>
      )
    } else {
      return (
        <div className = "vertical">
          {this.renderNavBar()}
          {this.renderInstructions()}
          <div className="horizontal">
            {this.renderPre()}
            {this.renderPost()}
          </div>
          <div style={{marginTop:SPACING}} className="horizontal-spaced">
            {this.renderButtons()}
            {this.renderMultiWorldButtons()}
          </div>
        </div>
      )
    }
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
