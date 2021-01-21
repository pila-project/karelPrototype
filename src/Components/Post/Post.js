import React, { Component } from 'react'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import { updateCurrentView, updateItem, postItemComplete } from 'redux/actions';
import { selectCodeByCurrentView } from 'redux/selectors';
import Curriculum from 'Curriculum/Curriculum.js'

import Button from 'react-bootstrap/Button'
import SplitPane from 'react-split-pane'

const mapDispatchToProps = {
  onUpdateCurrentView: (id) => updateCurrentView(id),
  onUpdateItem: (item) => updateItem(item),
  onPostItemComplete:() => postItemComplete()
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

class Post extends Component {

  constructor(props){
    super(props)
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount(){
    //document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount(){
    //document.removeEventListener("keydown", this.handleKeyPress, false);
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
    let post = Curriculum.getCollection('post')
    let currId = this.props.currentView
    var index = Curriculum.getIndexFromId(currId, post)
    if(index > 0) {
      index--
    }
    let nextId = post[index]['id']
    this.props.onUpdateCurrentView(nextId)
  }

  nextLesson() {
    this.props.onPostItemComplete()
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
)(Post)
