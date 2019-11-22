const db = require('./db');
require('./models');

function run() {
  db.sync({force: true}).then(() => {
    require('./seeders');
    db.close();
  });
}

module.exports = run;
