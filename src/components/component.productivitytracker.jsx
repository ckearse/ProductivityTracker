/** @format */

import react, { Component } from 'react';
import './styles.productivitytracker.css';

export default class ProductivityTracker extends Component {
  constructor(props) {
    super(props);

    this.updateTime = this.updateTime.bind(this);
    this.updateDateTime = this.updateDateTime.bind(this);
    this.updateActiveTime = this.updateActiveTime.bind(this);
    this.updateInactiveTime = this.updateInactiveTime.bind(this);
    this.startTracker = this.startTracker.bind(this);
    this.pauseTracker = this.pauseTracker.bind(this);
    this.resetTracker = this.resetTracker.bind(this);

    this.state = {
      timerStarted: false,
      timerPaused: false,
      intervalDuration: 1000,
      intervalId: null,
      dateTime: new Date().toLocaleTimeString(),
      activeTime: 0,
      inactiveTime: 0,
      totalTimeElapsed: 0,
    };
  }

  componentDidMount() {
    const { intervalDuration } = this.state;
    const timerInterval = setInterval(
      () => this.updateTime(),
      intervalDuration
    );

    this.setState({
      dateTime: new Date().toLocaleTimeString(),
      intervalId: timerInterval,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    this.setState({ intervalId: null });
  }

  updateTime() {
    const oldState = this.state;
    oldState.dateTime = this.updateDateTime();
    oldState.activeTime = this.updateActiveTime();
    oldState.inactiveTime = this.updateInactiveTime();
    oldState.totalTimeElapsed = this.updateTotalElapsedTime();

    this.setState(oldState);
  }

  updateDateTime() {
    return new Date().toLocaleTimeString();
  }

  updateActiveTime() {
    const {
      timerStarted,
      timerPaused,
      activeTime,
      intervalDuration,
    } = this.state;
    return timerStarted && !timerPaused
      ? activeTime + intervalDuration
      : activeTime;
  }

  updateInactiveTime() {
    const {
      timerStarted,
      timerPaused,
      inactiveTime,
      intervalDuration,
    } = this.state;

    return timerStarted && timerPaused
      ? inactiveTime + intervalDuration
      : inactiveTime;
  }

  updateTotalElapsedTime() {
    const { timerStarted, intervalDuration, totalTimeElapsed } = this.state;
    return timerStarted
      ? totalTimeElapsed + intervalDuration
      : totalTimeElapsed;
  }

  startTracker() {
    this.setState((oldState) => {
      return { ...oldState, timerStarted: true, timerPaused: false };
    });
  }

  pauseTracker() {
    this.setState((oldState) => {
      return { ...oldState, timerPaused: true };
    });
  }

  resetTracker() {
    this.setState((oldState) => {
      return {
        ...oldState,
        timerStarted: false,
        timerPaused: false,
        activeTime: 0,
        inactiveTime: 0,
        totalTimeElapsed: 0,
      };
    });
  }

  render() {
    const { dateTime, activeTime, inactiveTime, totalTimeElapsed } = this.state;

    return (
      <div className='tracker-container'>
        <h3>Productivity Tracker</h3>
        <div className='tracker-contents'>
          <div className='tracker-display'>
            <label>Current Time: {dateTime}</label>
            <label>Active Time: {activeTime}</label>
            <label>Inactive Time: {inactiveTime} </label>
            <label>Total Elapsed: {totalTimeElapsed}</label>
          </div>
          <div className='tracker-controls'>
            <button onClick={this.startTracker}>Start</button>
            <button onClick={this.pauseTracker}>Pause</button>
            <button onClick={this.resetTracker}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}
