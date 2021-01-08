import React, { Component } from 'react'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import { updateCurrentView, updateItem, preItemComplete } from 'redux/actions';
import { selectCodeByCurrentView } from 'redux/selectors';
import Curriculum from 'Curriculum/SimpleCurriculum.js'

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
  const savedXml = selectCodeByCurrentView(state);
  const studentState = state.studentState;
  const currentView = state.currentView;
  return { studentState , currentView, savedXml};
}

class Pre extends Component {

  constructor(props){
    super(props)
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false);
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
    return Curriculum.getComponent(itemId)
  }

  previousLesson() {
    let pre = Curriculum.getCollection('pre')
    let currId = this.props.currentView
    var index = Curriculum.getIndexFromId(currId, pre)
    if(index > 0) {
      index--
    }
    let nextId = pre[index]['id']
    this.props.onUpdateCurrentView(nextId)
  }

  nextLesson() {
    this.props.onPreItemComplete()
  }



  handleKeyPress(e) {
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
