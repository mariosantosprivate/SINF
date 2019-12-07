const jp = require('jsonpath');
const Journal = require('../../common/models/journal');

async function seed(data) {
    const { fiscalYear } = data.auditFile.header;

    const journals = jp.query(data, '$.auditFile.GeneralLedgerEntries.journal')[0];

    for (i in journals) {
        const journal = journals[i];

        await Journal.create({
            journalID: journal.journalID,
            description: journal.description,
            fiscal_year: fiscalYear,
        });
    }
}

module.exports = {
    seed
}