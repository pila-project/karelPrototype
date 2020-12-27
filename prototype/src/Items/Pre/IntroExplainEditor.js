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
import explainEditor from 'Img/explainEditor.jpg'
import { withTranslation } from 'react-i18next';
import {translate} from 'redux/translator.js'
const mapDispatchToProps = {
  onPreItemComplete: () => preItemComplete()
};

class IntroExplainEditor extends Component {


  render() {
    const title = translate('Each problem looks like this') + ':'
    const buttonTxt = translate('Next')

    return (<div className="verticalContainer centered fullSize" style={{backgroundColor:'black'}}>
      <h1 style={{marginBottom:40,marginTop:20,color:'white',fontSize:36}}>{title}</h1>
      <img src={explainEditor} style={{width:800}}/>
      <div style={{height:40}}/>
      <div className="horizontal" style={{alignItems:'center'}}>
        <Button
          size="lg"
          variant="success"
          onClick = {() => this.props.onPreItemComplete()}>{buttonTxt}
        </Button>

      </div>
    </div>)
  }

}

export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(IntroExplainEditor))
