const jp = require('jsonpath');
const GeneralLedgerEntries = require('../../common/models/generalLedgerEntries');

async function seed(data) {
    const { fiscalYear } = data.auditFile.header;

    const generalLedgerEntriesList = jp.query(data, '$.auditFile.GeneralLedgerEntries')[0];

    for (const key in generalLedgerEntriesList) {
        if (Object.prototype.hasOwnProperty.call(generalLedgerEntriesList, key)) {
            const generalLedgerEntries = generalLedgerEntriesList[key];

            await GeneralLedgerEntries.create({
                numberOfEntries: generalLedgerEntries.numberOfEntries,
                totalDebit: generalLedgerEntries.totalDebit,
                totalCredit: generalLedgerEntries.totalCredit,
                fiscal_year: fiscalYear,
            });
        }
    }
}

module.exports = {
    seed,
};
