import { withTranslation } from 'react-i18next';
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
import {translate} from 'redux/translator.js'

import Iframe from './iframe.js';

const mapDispatchToProps = {
  onPreItemComplete: () => preItemComplete()
};

const mapStateToProps = (state, ownProps) => {
  const userId = state.userId;
  return { userId };
}

class PostSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "https://stanforduniversity.qualtrics.com/jfe/form/SV_5BX15aKdXl7Wo9D?userIdKarel=" + this.props.userId//"https://docs.google.com/forms/d/e/1FAIpQLScOzu83pfrztQjmQQZ6PwABq4Wv12kAL7El3OYceWfKdiDh6Q/viewform?embedded=true&&entry.1088494362=test"
    }
  }


  render() {
    const title = translate('SURVEY')
    return (<div className="verticalContainer centered fullSize" style={{backgroundColor:'black'}}>
      <h1 style={{marginBottom:40,marginTop:20,color:'white',fontSize:36}}>{title}</h1>
      <Iframe source={this.state.src} />
    </div>)
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostSurvey)
