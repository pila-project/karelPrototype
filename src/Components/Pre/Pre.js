import React, { Component } from 'react'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import { updateCurrentView, updateItem, preItemComplete } from 'redux/actions';
import { selectCodeByCurrentView } from 'redux/selectors';
import Curriculum from 'Curriculum/Curriculum.js'

import Button from 'react-bootstrap/Button'
import SplitPane from 'react-split-pane'

const mapDispatchToProps = {
  onUpdateCurrentView: (id) => updateCurrentView(id),
  onUpdateItem: (item) => updateItem(item),
  onPreItemComplete:() => preItemComplete()
};

// const mapDispatchToProps = {
//   onUpdateCode: (code) => updateCode(code),
//   onUpdateCurrentView: (view) => updateCurrentView(view),
//   onProblemComplete: () => problemComplete(),
// };

const mapStateToProps = (state, ownProps) => {
  const moduleName = state.module;
  var pageState = state[moduleName];
  const savedXml = selectCodeByCurrentView(pageState);
  const studentState = pageState.studentState;
  const currentView = pageState.currentView;
  return { studentState , currentView, savedXml, moduleName};
}

class Pre extends Component {

  constructor(props){
    super(props)
    this.handleKeyPress = this.handleKeyPress.bind(this);

    console.log('am I getting initiated?!)')
  }

  componentWillMount() {
    this.LearnModule = new Curriculum(this.props.moduleName)
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false);
    console.log('did it work?')
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  changeLevel(newIndex) {
    // this.setState({
    //   levelIndex:newIndex
    // })
  }

  getComponent() {
    let itemId = this.props.currentView
    return this.LearnModule.getComponent(itemId)
  }

  previousLesson() {
    let pre = this.LearnModule.getCollection('pre')
    let currId = this.props.currentView
    var index = this.LearnModule.getIndexFromId(currId, pre)
    if(index > 0) {
      index--
    }
    let nextId = pre[index]['id']
    this.props.onUpdateCurrentView(nextId)
  }

  nextLesson() {
    console.log('I GOT TRIGGERED')
    this.props.onPreItemComplete()
  }



  handleKeyPress(e) {
    console.log('KEY GOT PRESSED')
    let key = e.key
    if(key == 'ArrowLeft') {
      this.previousLesson()
    }
    if(key == 'ArrowRight') {
      this.nextLesson()
    }
  }

  render() {
    return (
      <div
      onKeyPress={this.handleKeyPress}
      style={{width:'100vw', height:'100vh'}}>
        {this.getComponent()}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pre)
