const axios = require('../requests/axios');
const MaterialStock = require('../../common/models/materialStock');

async function seed() {
    const axiosInstance = axios.getInstance();

    const request = await axiosInstance.get('materialscore/materialsitems');
    const materialStockList = request.data;

    for (const materialStock of materialStockList) {
        let stock = 0;
        let amount = 0;
        const key = materialStock.itemKey;
        for (const inst of materialStock.materialsItemWarehouses) {
            stock += inst.stockBalance;
            amount = amount + inst.inventoryBalance.amount;
        }
        await MaterialStock.create({
            stock: stock,
            valueOfStock: amount,
            product_code: key,
        });
    }
}

module.exports = {
    seed,
};
