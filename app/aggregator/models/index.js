const models = {
  Customer: require('./customer'),
  HeaderData: require('./headerData'),
  SalesInvoice: require('./salesInvoice'),
  Invoice: require('./invoice'),
  Product: require('./product'),
  Tax: require('./tax')
}

models.Invoice.belongsTo(models.SalesInvoice, {foreignKey: 'fiscal_year'});
models.SalesInvoice.hasMany(models.Invoice, {
  foreignKey: 'fiscal_year',
  onDelete: 'cascade'
});

module.exports = models;