/** @format */

import React, { Component } from 'react';
import './../styles/styles.timerdisplay.css';
import calculateDurationComponents from '../utilities/TimeComponentHelper';

export default class TimerDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      milliseconds: props.milliseconds,
      title: props.title,
    };
  }

  componentWillReceiveProps(updatedProps) {
    this.setState({ milliseconds: updatedProps.milliseconds });
  }

  render() {
    const { title } = this.state;

    const {
      hours,
      minutes,
      seconds,
      milliseconds,
    } = calculateDurationComponents(this.state.milliseconds);

    return (
      <div className='display-container'>
        <span>{title}</span>

        <div>
          <label>
            {hours}
            <span> : </span>
          </label>

          <label>
            {minutes}
            <span> : </span>
          </label>

          <label>
            {seconds}
            <span> : </span>
          </label>
          <label>{milliseconds}</label>
        </div>
      </div>
    );
  }
}
