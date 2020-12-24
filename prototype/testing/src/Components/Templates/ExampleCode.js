import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';

import BlocklyKarel from '../Editor/BlocklyKarel.js'
import KarelWorld from '../Karel/KarelWorld.js'
import KarelGoal from '../Karel/KarelGoal.js'
import KarelEngine from '../Karel/KarelEngine.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {faPlay} from '@fortawesome/free-solid-svg-icons'
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons'
import {faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'
import {translate} from 'redux/translator.js'
import { connect } from 'react-redux';
import { preItemComplete } from 'redux/actions';
import { selectCodeByCurrentView } from 'redux/selectors';

const mapDispatchToProps = {
  onPreItemComplete: () => preItemComplete()
};

class ExampleCode extends Component {

  componentWillMount() {
    this.setState({
      isReset:true,
      isDone:false
    })
  }

  reset() {
    this.refs.world.reset(() => {
      this.setState({
        isReset:true
      })
    })
  }

  onRunDone() {
    this.setState({
      isDone:true
    })
  }

  run() {
    let codeText = this.refs.editor.getCode()
    this.setState({
      isReset:false
    }, () => {
      let engine = new KarelEngine()
      let isValid = engine.runCode(this.refs.world, this.refs.editor, () => this.onRunDone())
      if(!isValid) {
        this.setState({
          isReset:true
        })
      }
    })
  }

  renderRunResetButton() {
    if(this.state.isReset) {
      return <Button className="ideButton wideButton" size="lg" onClick = {() => this.run()}>
        <FontAwesomeIcon icon={faPlay}/> &nbsp;{translate('Run')}
      </Button>
    } else if (!this.state.isDone){
      return <Button disabled className="ideButton wideButton" size="lg" onClick = {() => this.run()}>
        <FontAwesomeIcon icon={faPlay}/> &nbsp;{translate('Run')}
      </Button>
    } else {
      return <Button variant="success" className="ideButton wideButton" size="lg" onClick = {() => this.props.onPreItemComplete()}>
        {translate('Next')}
      </Button>
    }
  }

  render() {
    return (
      <div className="horizontal">
        <div className = "vertical">
          <div className="horizontal">
            <div style={{marginRight:40}}>
              <h3>{translate('World')}:</h3>
              <KarelWorld 
                {...this.props.world}
                ref="world"
              />   
            </div> 
            
          </div>
          <div style={{marginTop:20}}>
            {this.renderRunResetButton()}
          </div>  
        </div>
        <div style={{width:500, height:500, marginRight:40}}>
          <BlocklyKarel 
            ref="editor"
            initialXml={this.props.initialXml}
            toolboxPresent={false}
            hideBlocks = {{
              'karel_procedure':true,
              'karel_while_dropdown':true,
              'controls_repeat_ext':true
            }}
          />
          
        </div>
      </div>
    )
  }

}

export default connect(
  null,
  mapDispatchToProps
)(ExampleCode)