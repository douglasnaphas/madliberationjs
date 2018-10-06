import React, { Component } from "react";

class ButtonRow extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col" />
          <div className="col">
            <button
              type="button"
              className="btn btn-secondary btn-lg btn-block"
            >
              {this.props.text}
            </button>
          </div>
          <div className="col" />
        </div>
        <div className="row">
          {
            /*if(boolProp in this.props) {
                    "s";
                }*/
            "xyz"
          }
        </div>
      </div>
    );
  }
}

export default ButtonRow;

// TODO: make the buttons only take up the center third of the screen
// TODO: make the buttons take a prop that says whether they're primary. test creating primary and non-primary buttons
// TODO: make the login button (visuals only)
// TODO: make the buttons take props that say whether they're disabled
// TODO: create the visuals of all three real buttons, one primary and enabled, two non-primary and disabled
// TODO: get rid of the react starter app visuals
// TODO: add the header
// TODO: get the login button to have a method called on click, logging to the console
// TODO: get the login button actually logging a person in
// TODO: deploy to madliberationgame, not haggadlibs
