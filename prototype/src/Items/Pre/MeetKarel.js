import React, { Component } from 'react';
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import MovePrompt from 'Img/movePrompt.png'
import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'
import RightTextArrow from 'Components/Util/RightTextArrow.js'
import { connect } from 'react-redux';
import { preItemComplete } from 'redux/actions';
import { selectCodeByCurrentView } from 'redux/selectors';
import karelSide from 'Img/karelSide.png'
import karelTop from 'Components/Karel/images/karelEast.png'
const mapDispatchToProps = {
  onPreItemComplete: () => preItemComplete()
};
  
class MeetKarel extends Component {


  render() {
    return (<div className="verticalContainer centered testBody">
      <h1 style={{marginBottom:40,marginTop:20}}>Meet <span className="blue">Karel</span> the Turtle!</h1>
      <img src={karelSide} style={{width:250}}/>
      <div style={{height:40}}/>
      <h3>This is what Karel looks like from the top:</h3>
      <img src={karelTop} style={{width:100}}/>
      <div style={{height:40}}/>
      <div className="horizontal" style={{alignItems:'center'}}>
        <RightTextArrow 
          direction="right"
          text="Click this button to continue"
          width={250}
        />
        <Button 
          size="lg"
          variant="success"
          onClick = {() => this.props.onPreItemComplete()}>Got it!
        </Button>
        
      </div>
    </div>)
  }

}

export default connect(
  null,
  mapDispatchToProps
)(MeetKarel)