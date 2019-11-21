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
  StockMovementLine: require('./stockMovementLine'),
  PaymentsInfo: require('./paymentsInfo'),
  Payment: require('./payment'),
  PaymentLine: require('./paymentLine'),
  GeneralLedgerEntries: require('./generalLedgerEntries'),
  Journal: require('./journal'),
  Line: require('./line'),
  Transaction: require('./trasaction')
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

// ************************ Payments ************************

models.Payment.belongsTo(models.PaymentsInfo, { foreignKey: 'fiscal_year' });
models.PaymentsInfo.hasMany(models.Payment, {
  foreignKey: 'fiscal_year',
  onDelete: 'cascade'
});

models.PaymentsInfo.belongsTo(models.DocumentTotals, { foreignKey: 'document_totals_id' });

models.PaymentLine.belongsTo(models.Payment, { foreignKey: 'payment_ref_no' });
models.Payment.hasMany(models.PaymentLine, {
  foreignKey: 'payment_ref_no',
  onDelete: 'cascade'
});

// ************************ GeneralLedgerEntries ************************

models.Line.belongsTo(models.Transaction, { foreignKey: 'transactionID' });
GeneralLedgerEntries.hasMany(Journal, {
  foreignKey: 'journalID',
  onDelete: 'cascade'
});

Journal.belongsTo(GeneralLedgerEntries, { foreignKey: 'GLEDate' });
Transaction.hasMany(Line, {
  foreignKey: 'code',
  onDelete: 'cascade'
});

Transaction.belongsTo(Journal, { foreignKey: 'journalID' });
Journal.hasMany(Transaction, {
  foreignKey: 'transactionID',
  onDelete: 'cascade'
});
module.exports = models;
