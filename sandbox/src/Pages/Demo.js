import React, { Component } from 'react';

class Demo extends Component {

  componentWillMount() {
    this.setState({
      numClicks:0
    })
  }

  onButtonClick() {
    let newValue = this.state.numClicks + 1
    this.setState({
      numClicks:newValue
    })
  }

  render() {
    return (
      <div>
        <button
          onClick = {() => this.onButtonClick()}
        >hello world</button>
        <p>num clicks {this.state.numClicks}</p>
      </div>
    )
  }
}

export default Demo