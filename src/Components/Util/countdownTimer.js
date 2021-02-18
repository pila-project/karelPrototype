import React, { Component } from 'react';
import {fireTimeUpSwal} from './TimeUpSwal.js';
import Swal from 'sweetalert2';

class ClockRender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: props.countdown,
      timerOn: true,
      time: {}
    };

    if (this.state.seconds) {
      this.state.time = this.secondsToTime(this.state.seconds)
    }

  }

  componentDidMount() {

    if (this.state.seconds) {
      this.timerID = setInterval(
        () => {
          this.tick()
          this.props.updateClock(this.state.seconds)
        },
        1000
      );
    }
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
    if (Object.keys(this.state.time).length) {
      return (
        <div>
          <span> {this.state.time.m.toLocaleString('en-US',{'minimumIntegerDigits':2})} : {this.state.time.s.toLocaleString('en-US',{'minimumIntegerDigits':2})} </span>
        </div>
      );
    } else {
      return(<div></div>)
    }
  }
}

export default ClockRender;
