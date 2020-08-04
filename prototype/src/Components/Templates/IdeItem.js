import React, { Component } from 'react';
import { connect } from 'react-redux';
import { problemComplete, preItemComplete, updateCode, updateCurrentView, runCode, runDone } from 'redux/actions'
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
import Curriculum from 'Curriculum/SimpleCurriculum.js'
import {translate} from 'redux/translator.js'


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
  onProblemComplete: () => problemComplete(),
  onPreItemComplete: () => preItemComplete(),
  onRunDone: (correct) => runDone(correct)
};

const mapStateToProps = (state, ownProps) => {
  const savedXml = selectCodeByCurrentView(state);
  const studentState = state.studentState;
  const currentView = state.currentView;
  return { studentState , currentView, savedXml};
}

const SPACE_FLOAT = 20
const SPACING = SPACE_FLOAT + 'px'

class IdeItem extends Component {

  static defaultProps = {
    hasRun: true,
    hasStep: false,
    postWorld: null,
    isEditable:true,
    testStage:'learning'
  }

  constructor(props){
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    this.engine = new KarelEngine()
    this.setState({
      isReset:true
    })
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

  // returns false if it is an example
  isStudentItem() {
    if(this.props.testStage != 'learning') {
      return true
    }
    let itemType = Curriculum.getItemType(this.props.currentView)
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
    var onDone = () => this.props.onPreItemComplete()
    if(this.props.testStage == 'learning') {
      onDone = () => this.props.onProblemComplete()
    }

    fireSuccessSwal(onDone)
  }

  handleKeyPress(e) {
    let key = e.key
    if(key == 'ArrowUp') {
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
    let itemType = Curriculum.getItemType(currentItemId)
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
          isEditable={this.props.isEditable}
          hideBlocks = {this.props.hideBlocks}
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
          <span>
            {/*<FontAwesomeIcon style={{'font-size':'30px'}}icon={faClock} /> 30mins*/}
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
    let problem = Curriculum.getProblemFromId(currentItemId)
    let activeKey = Curriculum.getItemType(currentItemId)

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
