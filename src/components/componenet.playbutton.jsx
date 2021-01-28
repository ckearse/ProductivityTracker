/** @format */

import React, { Component } from 'react';
import './styles.playbutton.css';

export default class PlayButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: props.isRunning,
    };

    this.buttonClick = this.buttonClick.bind(this);
  }

  componentWillReceiveProps(updatedProps) {
    this.setState({
      isRunning: updatedProps.isRunning,
    });
  }

  buttonClick() {
    this.props.onClick();
    console.log('PlayButton Clicked', this.state.isRunning);
  }

  RenderPlayIcon() {
    return (
      <svg width='20' height='20' fill='currentColor' viewBox='0 0 16 16'>
        <path d='M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z'></path>
      </svg>
    );
  }

  RenderPauseIcon() {
    return (
      <svg width='20' height='20' fill='currentColor' viewBox='0 0 16 16'>
        <path d='M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z' />
      </svg>
    );
  }

  render() {
    const { isRunning } = this.state;
    return (
      <button id='play-button' onClick={this.buttonClick}>
        {isRunning ? this.RenderPauseIcon() : this.RenderPlayIcon()}
      </button>
    );
  }
}
