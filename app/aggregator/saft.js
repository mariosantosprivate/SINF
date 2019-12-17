const parser = require('./parser');

let files = [];

function getFiles() {
  return files;
}

async function parseFiles(fileNames) {
  files = parser.findFiles();
  console.log('\nParsing SAF-T files...');
  console.log(
    '==============================================================================',
  );

  let i;

  if (!fileNames || fileNames.length === 0) {
    for (i = 0; i < files.length; i += 1) {
      files[i].data = parser.parseSAFT(files[i].name);
      console.log(`* Parsed file ${files[i].name}`);
    }
  } else {
    for (i = 0; i < files.length; i += 1) {
      if (fileNames.includes(files[i].name)) {
        files[i].data = parser.parseSAFT(files[i].name);
        console.log(`* Parsed file ${files[i].name}`);
      } else {
        console.log(`# Skipped file ${files[i].name}`);
      }
    }
  }

  console.log(
    '==============================================================================',
  );
  console.log('Finished parsing SAF-T files.\n');
}

module.exports = {
  getFiles,
  parseFiles,
};
