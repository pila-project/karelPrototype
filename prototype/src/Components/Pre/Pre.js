import React, { Component } from 'react'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import { updateCurrentView, preItemComplete } from 'redux/actions';
import { selectCodeByCurrentView } from 'redux/selectors';
import Curriculum from 'Curriculum/SimpleCurriculum.js'

import Button from 'react-bootstrap/Button'
import SplitPane from 'react-split-pane'

const mapDispatchToProps = {
  onUpdateCurrentView: (id) => updateCurrentView(id),
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
    let pre = Curriculum.getPre()
    let currId = this.props.currentView
    var index = Curriculum.getIndexFromPreId(currId)
    if(index > 0) {
      index--
    }
    let nextId = pre[index]['id']
    this.props.onUpdateCurrentView(nextId)
  }

  nextLesson() {
    this.props.onPreItemComplete()
  }

  motivation() {
    let options = [
      'Great work',
      'Amazing',
      'Wonderful',
      'Awesome',
      'How cool',
      'You are really learning'
    ]
    return options[Math.floor(Math.random() * options.length)];
  }

  handleKeyPress(e) {
    let key = e.key
    if(key == 'ArrowLeft') {
      this.previousLesson()
    }
    if(key == 'ArrowRight') {
      this.nextLesson()
    }
    if(key == 'ArrowUp') {
      Swal.fire({
        title: this.motivation() + '!',
        html: 'You solved the puzzle',
        icon: 'success',
        showConfirmButton:false,
        timer: 1500,
        onClose: () => this.nextLesson()
      })
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