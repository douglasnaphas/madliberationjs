import React, { Component } from 'react';
import Button from './Button.js';
import MiddleThird from './MiddleThird.js';

class ButtonRow extends Component {
  render() {
    // make a Button bearing the text in the props and put it in a MiddleThird
    let button = (
      <Button
        text={this.props.text}
        disabled={this.props.disabled}
        primary={this.props.primary}
        href={this.props.href}
      />
    );
    let middleThird = <MiddleThird comp={button} />;
    return (
      <div>
        <br />
        {middleThird}
        <br />
      </div>
    );
  }
}

export default ButtonRow;
