const seeders = {
  customerSeeder: require('./customerSeeder')
}

function runAll() {
  for(seeder in seeders) {
    seeders[seeder].seed();
  }
}

module.exports = {
  runAll
}
