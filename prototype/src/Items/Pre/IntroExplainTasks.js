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

class IntroExplainTasks extends Component {


  render() {
    const text = translate("You're ready to solve 5 Karel problems") + '!'
    const sub = translate("The first four problems each introduce a new programming idea.") + " " +
                translate("The final problem is your main challenge.")
    //const sub = translate("You're given 5 problems, to be solved one after another. The first four problems introduce a new programming idea each. The final problem is the main challenge.") + '...
    return <Splash
      text={text}
      subText={sub}
      onNext={() => this.props.onPreItemComplete()}
    />
  }

}

export default connect(
  null,
  mapDispatchToProps
)(IntroExplainTasks)
