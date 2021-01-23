import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {translate} from 'redux/translator.js'
import { v4 } from 'uuid';
import firebase, { createDataLog, firebaseAuth } from '../../firebase/firebase';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userId: ""
    };
    this.submitUser = this.submitUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.render = this.render.bind(this)
  }

  componentDidMount() {
    if (this.props.autofill) { // auto advance if autofill of user Id
      this.submitUser(null)
    }
  }

  render() {
    const { userId } = this.state;

    if (this.props.autofill & !this.props.userId) { // generate unique identifier with v4
      let randomUserId = v4();
      this.state.userId = randomUserId;
      var inputField = <input
        type="text"
        id="username"
        value={randomUserId}
        style={{
          color:'black',
          width:300,
          height:40,
          textAlign:'center',
          fontSize:24,
          margin:20,
          alignSelf: 'center'
        }}
      />;
    } else {
      this.state.userId = this.props.userId;
      var inputField = <input
        type="text"
        id="username"
        //value={this.state.userId}
        onChange={this.handleChange} style={{
          color:'black',
          width:300,
          height:40,
          textAlign:'center',
          fontSize:24,
          margin:20,
          alignSelf: 'center'
        }}
      />;
    }

    return (
      <div style={{
        width:'100vw',
        height:'100vh',
        backgroundColor:'black'
      }}>
        <div className="vertical centered fullSize" >
          <div className="horizontal centered fullSize" style={{
            justifyContent:'space-around'}}>
            <div className="vertical">
              <div style={{
                color:'white',
                width:800,
                height:150,
                textAlign:'center',
                fontSize:36
              }}>
                {this.props.text}
              </div>
              <div style={{
                color:'grey',
                width:800,
                height:150,
                textAlign:'center',
                fontSize:24
              }}>
                {this.props.subText}
                <form onSubmit = {this.submitUser} style = {{
                  width: '100%'
                }}>
                  <label htmlFor="username" style={{
                    color:'white',
                    width: 100,
                    textAlign:'center',
                    fontSize:24,
                    alignSelf: 'center'
                  }}> Username: </label>
                  {inputField}
                  <Button
                    type = "submit"
                    size="lg"
                    variant="success"
                    style={{
                      alignSelf:'center',
                    }}>
                    {translate('Next')}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  submitUser(event) {
    if (event) event.preventDefault();
    const userId = this.state.username ? this.state.username : this.state.userId;
    firebaseAuth.signInAnonymously().then(() => {
      this.props.onNext(userId);
      this.setState({ userId: "" });
    }).catch(error => {
      console.log('something did not work in the login:')
      console.log(error)
    });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

}

export default Login
