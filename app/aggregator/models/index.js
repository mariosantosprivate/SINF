const models = {
  Customer: require('./customer'),
  HeaderData: require('./headerData'),
  SalesInvoice: require('./salesInvoice'),
  DocumentTotals: require('./documentTotals'),
  ShippingInfo: require('./shippingInfo'),
  Invoice: require('./invoice'),
  InvoiceLine: require('./InvoiceLine'),
  Product: require('./product'),
  Tax: require('./tax'),
  MovementOfGoods: require('./movementOfGoods'),
  StockMovement: require('./stockMovement'),
  StockMovementLine: require('./stockMovementLine')
};

// ************************ SalesInvoice ************************

models.Invoice.belongsTo(models.SalesInvoice, { foreignKey: 'fiscal_year' });
models.SalesInvoice.hasMany(models.Invoice, {
  foreignKey: 'fiscal_year',
  onDelete: 'cascade'
});

models.SalesInvoice.belongsTo(models.DocumentTotals, {
  foreignKey: 'document_totals_id'
});

models.Invoice.belongsTo(models.Customer, { foreignKey: 'customer_id' });
models.Customer.hasMany(models.Invoice, {
  foreignKey: 'customer_id',
});

// Technically a shipping info belongs to an Invoice, but sequelize is retarded
// https://stackoverflow.com/questions/43746774/sequelize-one-to-one-relation
models.Invoice.belongsTo(models.ShippingInfo, {
  foreignKey: 'ship_to_info_id',
  onDelete: 'cascade'
});

models.Invoice.belongsTo(models.ShippingInfo, {
  foreignKey: 'ship_from_info_id',
  onDelete: 'cascade'
});

models.InvoiceLine.belongsTo(models.Invoice, { foreignKey: 'invoice_no' });
models.Invoice.hasMany(models.InvoiceLine, {
  foreignKey: 'invoice_no',
  onDelete: 'cascade'
});

models.InvoiceLine.belongsTo(models.Product, {
  foreignKey: 'product_code'
});

models.InvoiceLine.belongsTo(models.Tax, {
  foreignKey: 'tax_id'
});

// ************************ MovementOfGoods ************************

models.StockMovement.belongsTo(models.MovementOfGoods, { foreignKey: 'fiscal_year' });
models.MovementOfGoods.hasMany(models.StockMovement, {
  foreignKey: 'fiscal_year',
  onDelete: 'cascade'
});

models.MovementOfGoods.belongsTo(models.DocumentTotals, {
  foreignKey: 'document_totals_id'
});

models.StockMovement.belongsTo(models.Customer, { foreignKey: 'customer_id' });
models.Customer.hasMany(models.StockMovement, {
  foreignKey: 'customer_id'
});

models.StockMovement.belongsTo(models.ShippingInfo, {
  foreignKey: 'ship_to_info_id',
  onDelete: 'cascade'
});

models.StockMovement.belongsTo(models.ShippingInfo, {
  foreignKey: 'ship_from_info_id',
  onDelete: 'cascade'
});

/*
models.StockMovement.belongsTo(models.Supplier, { foreignKey: 'supplier_id' });
models.Supplier.hasMany(models.StockMovement, {
  foreignKey: 'supplier_id'
});
*/

models.StockMovementLine.belongsTo(models.StockMovement, { foreignKey: 'document_number' });
models.StockMovement.hasMany(models.StockMovementLine, {
  foreignKey: 'document_number',
  onDelete: 'cascade'
});

models.StockMovementLine.belongsTo(models.Product, {
  foreignKey: 'product_code'
});

models.StockMovementLine.belongsTo(models.Tax, {
  foreignKey: 'tax_id'
});

module.exports = models;
