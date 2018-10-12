"use strict";

var test = require("unit.js");
var helloWorld = require("../hello-world.js");

describe("Tests index", function() {
  it("verifies successful response", function(done) {
    helloWorld.get(
      {
        /* event */
      },
      {
        /* context */
      },
      (err, result) => {
        try {
          test.number(result.statusCode).is(200);
          test.string(result.body).is('{"contents":"hello, world"}');
          test.value(result).hasHeader("content-type", "application/json");
          done();
        } catch (error) {
          done(error);
        }
      }
    );
  });
});
