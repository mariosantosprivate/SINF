let db = require('./db');

function run() {
  var normalizedPath = require('path').join(__dirname, 'models');

  require('fs').readdirSync(normalizedPath).forEach(file => {
    require("./models/" + file);
  });
  db.sync();
}

module.exports = run;
