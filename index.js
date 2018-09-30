"use strict";

exports.get = function(event, context, callback) {
  // var contents = fs.readFileSync(`public${path.sep}index.html`);
  let contents = { contents: "hello, world" };
  var result = {
    statusCode: 200,
    body: JSON.stringify(contents),
    headers: { "content-type": "application/json" }
  };

  callback(null, result);
};
