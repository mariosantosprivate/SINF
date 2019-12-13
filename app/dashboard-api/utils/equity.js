function sncEquity() {
  this.positivos = [];
  this.negativos = [];
  this.devedoresECredores = [];
}
let sNCsAtivo = new sncEquity();
sNCsAtivo.positivos = [
  51, // 331
  53, // 334

  54, // 335

  551, // 336

  552, // 337

  5811, // 343 verificar
  5891, // 345

  5712, // 340
  5931, // 349
  594 // 351
];
sNCsAtivo.negativos = [
  521, // 332
  5812, // 344
  5892, // 346
  5932, // 350
  89 // 647
];
sNCsAtivo.devedoresECredores = [
  522, // 333
  56, // 338
  5711, // 339
  5713, // 341
  579, // 342
  591, // 347
  592, // 348
  599, // 352
  818 // 646
];
sNCsAtivo.positivos.sort(sortNumber).reverse();
sNCsAtivo.negativos.sort(sortNumber).reverse();
sNCsAtivo.devedoresECredores.sort(sortNumber).reverse();

function sortNumber(a, b) {
  return a - b;
}
module.exports = sNCsAtivo;
