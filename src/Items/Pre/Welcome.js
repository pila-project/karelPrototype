import React, { Component } from 'react';
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import MovePrompt from 'Img/movePrompt.png'
import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'
import RightTextArrow from 'Components/Util/RightTextArrow.js'
import { connect } from 'react-redux';
import { preItemComplete, userLogged } from 'redux/actions';
import { selectCodeByCurrentView } from 'redux/selectors';
import Login from 'Components/Templates/Login.js'
import { withTranslation } from 'react-i18next';
import { translate } from 'redux/translator.js'

import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

const mapDispatchToProps = {
  onPreItemComplete: (userId) => preItemComplete(userId),
};

const mapStateToProps = (state, ownProps) => {
  const autofill = state.autofillUserId;
  const userId = state.userId; // required to see if autofill with url parameter or randomly generated parameter
  return { autofill, userId } ;
}

/*
This is how we will go about it:
1. Get user info
2. Write the user info to the state of redux, as a state variable
*/

const Welcome = (props) => {

  let { search } = useLocation()
  const values = queryString.parse(search)
  
  var userId = null;
  if ('userId' in values) {
    userId = values.userId
  }
  const translate = props.t
  const text = translate('Welcome')
  const sub = translate('You are going to learn how to program. Before we start, choose a username.')
  return <Login text={text} subText={sub} autofill = {props.autofill} userId = {userId} onNext={props.onPreItemComplete}/>

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Welcome))