import { withTranslation } from 'react-i18next';import React, { Component } from 'react';
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
import {translate} from 'redux/translator.js'

const mapDispatchToProps = {
  onPreItemComplete: () => preItemComplete()
};

class TutorialEnd extends Component {


  render() {
    const text = translate('Great work') + '!'
    const sub = translate('You have finished the tutorial.')
    return <Splash
      text={text}
      subText={sub}
      onNext={() => alert('You can close this window and return to the main task.')}
    />
  }

}

export default connect(
  null,
  mapDispatchToProps
)(TutorialEnd)
