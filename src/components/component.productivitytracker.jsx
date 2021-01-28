/** @format */

import { Component } from 'react';
import Playbutton from './componenet.playbutton';
import TimerDisplay from './component.timerdisplay';
import './styles.productivitytracker.css';

export default class ProductivityTracker extends Component {
  constructor(props) {
    super(props);

    this.updateTime = this.updateTime.bind(this);
    this.calculateActiveTime = this.calculateActiveTime.bind(this);
    this.calculateInactiveTime = this.calculateInactiveTime.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.startTracker = this.startTracker.bind(this);
    this.pauseTracker = this.pauseTracker.bind(this);
    this.resetTracker = this.resetTracker.bind(this);

    this.state = {
      timerStarted: false,
      timerPaused: false,
      isTimerRunning: false,
      intervalDuration: 100,
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

    console.log('Initial State', this.state);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    this.setState({ intervalId: null });
  }

  updateTime() {
    this.setState({
      dateTime: this.calculateDateTime(),
      activeTime: this.calculateActiveTime(),
      inactiveTime: this.calculateInactiveTime(),
      totalTimeElapsed: this.calculateTotalElapsedTime(),
    });
  }

  calculateDateTime() {
    return new Date().toLocaleTimeString();
  }

  calculateActiveTime() {
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

  calculateInactiveTime() {
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

  calculateTotalElapsedTime() {
    const { timerStarted, intervalDuration, totalTimeElapsed } = this.state;
    return timerStarted
      ? totalTimeElapsed + intervalDuration
      : totalTimeElapsed;
  }

  toggleTimer() {
    const { isTimerRunning } = this.state;

    isTimerRunning ? this.pauseTracker() : this.startTracker();
  }

  startTracker() {
    this.setState((oldState) => {
      return {
        ...oldState,
        timerStarted: true,
        timerPaused: false,
        isTimerRunning: true,
      };
    });
  }

  pauseTracker() {
    this.setState((oldState) => {
      return {
        ...oldState,
        timerPaused: true,
        isTimerRunning: false,
      };
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
        isTimerRunning: false,
      };
    });
  }

  render() {
    const {
      dateTime,
      activeTime,
      inactiveTime,
      totalTimeElapsed,
      isTimerRunning,
    } = this.state;

    return (
      <div className='tracker-container'>
        <h3>Productivity Tracker</h3>
        <div className='tracker-contents'>
          <div className='tracker-display'>
            <label>Current Time: {dateTime}</label>
            <TimerDisplay
              title={'Active Time:'}
              milliseconds={activeTime}
            ></TimerDisplay>
            <TimerDisplay
              title={'Inactive Time:'}
              milliseconds={inactiveTime}
            ></TimerDisplay>
            <TimerDisplay
              title={'Total Elapsed Time:'}
              milliseconds={totalTimeElapsed}
            ></TimerDisplay>
          </div>
          <div className='tracker-controls'>
            <Playbutton
              isRunning={isTimerRunning}
              onClick={this.toggleTimer}
            ></Playbutton>
            <button onClick={this.resetTracker} className='control-button'>
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}
