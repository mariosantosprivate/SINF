const MaterialStock = require('../../../common/models/materialStock');

async function calculate() {
    let cont = 0;

    const materialStockList = await MaterialStock.findAll({
        raw: true,
    });

    for (const materialStock of materialStockList) {
        cont += materialStock.valueOfStock;
    }

    return cont / 2;
}

module.exports = calculate;
