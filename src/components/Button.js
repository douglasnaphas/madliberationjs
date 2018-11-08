import React, { Component } from 'react';

class Button extends Component {
  render() {
    let className =
      'btn' +
      (this.props.primary ? ' btn-primary' : ' btn-secondary') +
      ' btn-block';
    let href = 'href' in this.props ? this.props.href : '#';
    return (
      <div>
        <a href={href}>
          <button
            type="button"
            className={className}
            disabled={this.props.disabled}
          >
            {this.props.text}
          </button>
        </a>
      </div>
    );
  }
}

export default Button;
