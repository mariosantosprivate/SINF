const PurchaseInvoice = require('../../../common/models/purchaseInvoice');
const InvoiceLine = require('../../../common/models/invoiceLine');
const PurchaseInvoiceLine = require('../../../common/models/purchaseInvoiceLine');
const Invoice = require('../../../common/models/invoice');
const MaterialStock = require('../../../common/models/materialStock');

async function calculate(/*firstYeaar,lastYear*/) {
    let stockSalesValue = 0;
    let stockPurchasesValue = 0;
    let turnOver = 0;
    let cont = 0;

    const materialStockList = await MaterialStock.findAll({
        raw: true,
    });

    for (aux = 2019/*firstYear*/; aux <= 2019/*lastYear*/; aux++) {
        const InvoiceLines = await InvoiceLine.findAll({
            raw: true,
            include: [{
                model: Invoice,
                where: { fiscal_year: aux },
            }],
        });
        for (var i = 0; i < InvoiceLines.length; i++) {
            for (var j = 0; j < materialStockList.length; j++) {
                if (InvoiceLines[i].creditAmount == null) { break; }
                if (InvoiceLines[i].product_code == materialStockList[j].product_code) {
                    if (InvoiceLines[i].creditAmount != null) {
                        stockSalesValue += parseInt(InvoiceLines[i].creditAmount);
                        break;
                    }
                }
            }
        }
        const purchasesInvoiceLines = await PurchaseInvoiceLine.findAll({
            raw: true,
            include: [{
                model: PurchaseInvoice,
                where: { fiscal_year: aux },
            }],
        });
        for (var i = 0; i < purchasesInvoiceLines.length; i++) {
            for (var j = 0; j < materialStockList.length; j++) {
                if (purchasesInvoiceLines[i].product_code == materialStockList[j].product_code) {
                    if (parseInt(purchasesInvoiceLines[i]['PurchaseInvoice.payableAmount']) != null) {
                        stockPurchasesValue += parseInt(purchasesInvoiceLines[i]['PurchaseInvoice.payableAmount']);
                        break;
                    }
                }
            }
        }
    }

    turnOver = stockSalesValue / (stockPurchasesValue - stockSalesValue);
    cont = (1) * 365 / (turnOver * 100);
    return cont;
}

module.exports = calculate;
