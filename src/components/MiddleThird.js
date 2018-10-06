import React, { Component } from "react";

class MiddleThird extends Component {
  render() {
    return (
      <div className="row">
        <div className="col" />
        <div className="col">{this.props.comp}</div>
        <div className="col" />
      </div>
    );
  }
}

export default MiddleThird;
