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
import Splash from 'Components/Templates/Splash.js'
import { withTranslation } from 'react-i18next';

const mapDispatchToProps = {
  onPreItemComplete: () => preItemComplete()
};
  
class Welcome extends Component {


  render() {
    const translate = this.props.t
    const text = translate('Welcome')
    const sub = translate('You are going to learn how to program')
    return <Splash text={text} subText={sub}/>
  }

}

export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(Welcome))


