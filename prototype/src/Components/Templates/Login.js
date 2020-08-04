import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {translate} from 'redux/translator.js'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userId: ""
    };
    this.submitUser = this.submitUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { userId } = this.state;
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
                  <input
                    type="text"
                    id="username"
                    //value={userId}
                    onChange={this.handleChange} style={{
                      color:'black',
                      width:300,
                      height:40,
                      textAlign:'center',
                      fontSize:24,
                      margin:20,
                      alignSelf: 'center'
                    }}
                  />
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
    event.preventDefault();
    const userId = this.state.username;
    console.log(this.state)
    this.props.onNext(userId);
    this.setState({ userId: "" });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

}

export default Login
