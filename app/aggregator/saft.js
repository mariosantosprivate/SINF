const parser = require('./parser');

const FILES = [
  {
    name: 'SAFT_DEMOSINF_01-01-2016_31-12-2016.xml',
    data: null
  }
];

async function parseFiles() {
  console.log('\nParsing SAF-T files...');
  console.log('==============================================================================')

  let i;
  for (i = 0; i < FILES.length; i++) {
    FILES[i].data = parser.parseSAFT(FILES[i].name);
    console.log('* Parsed file ' + FILES[i].name);
  }

  console.log('==============================================================================')
  console.log('Finished parsing SAF-T files');
}

parseFiles();

module.exports = {
  FILES
};
