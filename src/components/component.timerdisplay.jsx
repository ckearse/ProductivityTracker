/** @format */

import React, { Component, Fragment } from 'react';
import './styles.timerdisplay.css';

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

  calculateDurationComponents() {
    const { milliseconds } = this.state;
    const millisecondsPerUnit = {
      hours: 60 * 60 * 1000,
      minutes: 60 * 1000,
      seconds: 1000,
    };

    return deriveTimeComponents(milliseconds);

    function deriveTimeComponents(milliseconds) {
      const derivedHours = deriveHours(milliseconds);
      const derivedMinutes = deriveMinutes(derivedHours);
      const derivedSeconds = deriveSeconds(derivedMinutes);

      return derivedSeconds;
    }

    function deriveHours(milliseconds) {
      const hours = Math.floor(milliseconds / millisecondsPerUnit.hours);
      const hour_milliRemainder = milliseconds % millisecondsPerUnit.hours;

      return {
        hours: hours,
        hour_milliRemainder: hour_milliRemainder,
      };
    }

    function deriveMinutes(durationObj) {
      const minutes = Math.floor(
        durationObj.hour_milliRemainder / millisecondsPerUnit.minutes
      );
      const minute_milliRemainder =
        durationObj.hour_milliRemainder % millisecondsPerUnit.minutes;

      return {
        ...durationObj,
        minutes: minutes,
        minute_milliRemainder: minute_milliRemainder,
      };
    }

    function deriveSeconds(durationObj) {
      const seconds = Math.floor(
        durationObj.minute_milliRemainder / millisecondsPerUnit.seconds
      );
      const second_milliRemainder =
        durationObj.minute_milliRemainder % millisecondsPerUnit.seconds;

      return {
        ...durationObj,
        seconds: seconds,
        milliseconds: second_milliRemainder,
      };
    }
  }

  render() {
    const { title } = this.state;

    const {
      hours,
      minutes,
      seconds,
      milliseconds,
    } = this.calculateDurationComponents();

    console.log(this.calculateDurationComponents());

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
