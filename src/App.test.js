import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MadUtils } from "./MadUtils";

test("adds 1 + 2 to equal 3", () => {
  expect(MadUtils.addNums(1, 2)).toBe(3);
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("userOrFalse() can be called", () => {
  let app = new App();
  app.userOrFalse();
});

test("when there's no logged in user, userOrFalse() should return false", () => {
  // mock so that AmazonCognitoIdentity.CognitoIdToken returns an object with
  // payload == {}
});
