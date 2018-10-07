import React, { Component } from "react";

class Button extends Component {
  render() {
    let className =
      "btn" +
      (this.props.primary ? " btn-primary" : " btn-secondary") +
      " btn-lg btn-block";
    return (
      <div>
        <button
          type="button"
          className={className}
          disabled={this.props.disabled}
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default Button;
