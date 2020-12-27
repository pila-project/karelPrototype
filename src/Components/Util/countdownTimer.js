import React, { Component } from 'react';
import {fireTimeUpSwal} from './TimeUpSwal.js';
import Swal from 'sweetalert2';
//import { problemComplete } from 'redux/actions'



//const mapDispatchToProps = {
//  onCountdownEnd: () => problemComplete()
//};

class Clock extends Component {
  constructor(props) {
    super(props);
    this.startTimeInMinutes = props.duration;
    this.state = {timerOn: true, seconds: this.startTimeInMinutes * 60, time: {}};
    this.state.time = this.secondsToTime(this.state.seconds)
  }

  componentDidMount() {

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  tick() {
    let seconds = this.state.seconds - 1;
    if (seconds >= 0) {
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds
      });
    } else {
      this.countdownEnd()
    }
  }

  countdownEnd() {
    clearInterval(this.timerID);
    this.setState({timerOn: false})
    var onTimeUp = () => this.props.onCountdownEnd()

    if (!Swal.isVisible()) fireTimeUpSwal(onTimeUp)
  }

  render() {
    return (
      <div>
        <span> {this.state.time.m} : {this.state.time.s} </span>
      </div>
    );
  }
}

export default Clock;
