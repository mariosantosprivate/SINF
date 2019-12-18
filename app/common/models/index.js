/* eslint-disable global-require */
const models = {
  MaterialStock: require('./materialStock'),
  Customer: require('./customer'),
  HeaderData: require('./headerData'),
  Supplier: require('./supplier'),
  AddressStructure: require('./addressStructure'),
  SalesInvoice: require('./salesInvoice'),
  ShippingInfo: require('./shippingInfo'),
  Invoice: require('./invoice'),
  InvoiceLine: require('./invoiceLine'),
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
  TransactionLine: require('./transactionLine'),
  Transaction: require('./transaction'),
  PurchaseInvoice: require('./purchaseInvoice'),
  PurchaseInvoiceLine: require('./purchaseInvoiceLine'),
};

// ************************ Supplier **********************

models.AddressStructure.belongsTo(models.Supplier, {
  foreignKey: 'billingAddress',
});
models.Supplier.hasOne(models.AddressStructure, {
  foreignKey: 'billingAddress',
  onDelete: 'cascade',
});
models.Supplier.hasOne(models.AddressStructure, {
  foreignKey: 'shipToAddress',
  onDelete: 'cascade',
});

// ************************ SalesInvoice ************************

models.Invoice.belongsTo(models.SalesInvoice, { foreignKey: 'fiscal_year' });
models.SalesInvoice.hasMany(models.Invoice, {
  foreignKey: 'fiscal_year',
  onDelete: 'cascade',
});

models.Invoice.belongsTo(models.Customer, { foreignKey: 'customer_id' });
models.Customer.hasMany(models.Invoice, {
  foreignKey: 'customer_id',
});

// Technically a shipping info belongs to an Invoice, but sequelize is retarded
// https://stackoverflow.com/questions/43746774/sequelize-one-to-one-relation
models.Invoice.belongsTo(models.ShippingInfo, {
  as: 'shipToInfo',
  foreignKey: 'ship_to_info_id',
  onDelete: 'cascade',
});

models.Invoice.belongsTo(models.ShippingInfo, {
  as: 'shipFromInfo',
  foreignKey: 'ship_from_info_id',
  onDelete: 'cascade',
});

models.InvoiceLine.belongsTo(models.Invoice, { foreignKey: 'invoice_no' });
models.Invoice.hasMany(models.InvoiceLine, {
  foreignKey: 'invoice_no',
  onDelete: 'cascade',
});

models.InvoiceLine.belongsTo(models.Product, {
  foreignKey: 'product_code',
});

models.InvoiceLine.belongsTo(models.Tax, {
  foreignKey: 'tax_id',
});

// ************************ MovementOfGoods ************************

models.StockMovement.belongsTo(models.MovementOfGoods, {
  foreignKey: 'fiscal_year',
});
models.MovementOfGoods.hasMany(models.StockMovement, {
  foreignKey: 'fiscal_year',
  onDelete: 'cascade',
});

models.StockMovement.belongsTo(models.Customer, { foreignKey: 'customer_id' });
models.Customer.hasMany(models.StockMovement, {
  foreignKey: 'customer_id',
});

models.StockMovement.belongsTo(models.ShippingInfo, {
  foreignKey: 'ship_to_info_id',
  onDelete: 'cascade',
});

models.StockMovement.belongsTo(models.ShippingInfo, {
  foreignKey: 'ship_from_info_id',
  onDelete: 'cascade',
});

/*
models.StockMovement.belongsTo(models.Supplier, { foreignKey: 'supplier_id' });
models.Supplier.hasMany(models.StockMovement, {
  foreignKey: 'supplier_id'
});
*/

models.StockMovementLine.belongsTo(models.StockMovement, {
  foreignKey: 'document_number',
});
models.StockMovement.hasMany(models.StockMovementLine, {
  foreignKey: 'document_number',
  onDelete: 'cascade',
});

models.StockMovementLine.belongsTo(models.Product, {
  foreignKey: 'product_code',
});

models.StockMovementLine.belongsTo(models.Tax, {
  foreignKey: 'tax_id',
});

// ************************ Payments ************************

models.Payment.belongsTo(models.PaymentsInfo, { foreignKey: 'fiscal_year' });
models.PaymentsInfo.hasMany(models.Payment, {
  foreignKey: 'fiscal_year',
  onDelete: 'cascade',
});

models.PaymentLine.belongsTo(models.Payment, { foreignKey: 'payment_ref_no' });
models.Payment.hasMany(models.PaymentLine, {
  foreignKey: 'payment_ref_no',
  onDelete: 'cascade',
});

// ************************ GeneralLedgerEntries ************************
models.Journal.belongsTo(models.GeneralLedgerEntries, {
  foreignKey: 'fiscal_year',
});
models.GeneralLedgerEntries.hasMany(models.Journal, {
  foreignKey: 'fiscal_year',
  onDelete: 'cascade',
});

models.Transaction.belongsTo(models.Journal, { foreignKey: 'journalId' });
models.Journal.hasMany(models.Transaction, {
  foreignKey: 'journalId',
  onDelete: 'cascade',
});

models.TransactionLine.belongsTo(models.Transaction, {
  foreignKey: 'transactionId',
});
models.Transaction.hasMany(models.TransactionLine, {
  foreignKey: 'transactionId',
  onDelete: 'cascade',
});

models.Transaction.belongsTo(models.Supplier, {
  foreignKey: 'supplierId',
});
models.Supplier.hasMany(models.Transaction, {
  foreignKey: 'supplierId',
  onDelete: 'cascade',
});

models.Transaction.belongsTo(models.Customer, { foreignKey: 'customerId' });
models.Customer.hasMany(models.Transaction, {
  foreignKey: 'customerId',
  onDelete: 'cascade',
});

// ************************ PurchaseInvoice ************************

models.PurchaseInvoice.belongsTo(models.Supplier, { foreignKey: 'supplier_id' });

models.PurchaseInvoiceLine.belongsTo(models.PurchaseInvoice, { foreignKey: 'invoice_id' });
models.PurchaseInvoice.hasMany(models.PurchaseInvoiceLine, {
  foreignKey: 'invoice_id',
  onDelete: 'cascade',
});

models.PurchaseInvoiceLine.belongsTo(models.Product, {
  foreignKey: 'product_code',
});

// ************************ MaterialStock ************************
models.MaterialStock.belongsTo(models.Product, {
  foreignKey: 'product_code',
});
models.Product.hasOne(models.MaterialStock, {
  foreignKey: 'product_code',
  onDelete: 'cascade',
});

module.exports = models;
