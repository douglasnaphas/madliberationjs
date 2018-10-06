import React, { Component } from "react";
import Button from "./Button.js";
import MiddleThird from "./MiddleThird.js";

class ButtonRow extends Component {
  render() {
    // make a Button bearing the text in the props and put it in a MiddleThird
    let button = <Button text={this.props.text} />;
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

// TODO: make the buttons only take up the center third of the screen
// TODO: see if I can override render() in making different types of buttons
// TODO: make the buttons take a prop that says whether they're primary. test creating primary and non-primary buttons
// TODO: make the login button (visuals only)
// TODO: make the buttons take props that say whether they're disabled
// TODO: create the visuals of all three real buttons, one primary and enabled, two non-primary and disabled
// TODO: get rid of the react starter app visuals
// TODO: add the header
// TODO: get the login button to have a method called on click, logging to the console
// TODO: get the login button actually logging a person in
// TODO: deploy to madliberationgame, not haggadlibs
