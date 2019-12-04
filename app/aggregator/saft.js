const parser = require('./parser');

const FILES = [
  {
    name: 'SAFT_DEMOSINF_01-01-2016_31-12-2016.xml',
    data: null,
  },
];

async function parseFiles(fileNames) {
  console.log('\nParsing SAF-T files...');
  console.log('==============================================================================');

  let i;

  if (!fileNames || fileNames.length === 0) {
    for (i = 0; i < FILES.length; i += 1) {
      FILES[i].data = parser.parseSAFT(FILES[i].name);
      console.log(`* Parsed file ${FILES[i].name}`);
    }
  } else {
    for (i = 0; i < FILES.length; i += 1) {
      if (fileNames.includes(FILES[i].name)) {
        FILES[i].data = parser.parseSAFT(FILES[i].name);
        console.log(`* Parsed file ${FILES[i].name}`);
      } else { console.log(`# Skipped file ${FILES[i].name}`); }
    }
  }

  console.log('==============================================================================');
  console.log('Finished parsing SAF-T files.\n');
}

module.exports = {
  FILES,
  parseFiles,
};
