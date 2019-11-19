const models = {
  Customer: require('./customer'),
  HeaderData: require('./headerData'),
  SalesInvoice: require('./salesInvoice'),
  DocumentTotals: require('./documentTotals'),
  ShippingInfo: require('./shippingInfo'),
  Invoice: require('./invoice'),
  InvoiceLine: require('./InvoiceLine'),
  Product: require('./product'),
  Tax: require('./tax')
};

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
  foreignKey: 'ship_to_info',
  onDelete: 'cascade'
});

models.Invoice.belongsTo(models.ShippingInfo, {
  foreignKey: 'ship_from_info',
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

module.exports = models;
