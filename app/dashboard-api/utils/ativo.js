function SNCsAtivo() {
  this.positivo_corrente_credito = [];
  this.positivo_corrente_debito = [];
  this.positivo_corrente = [];
  this.positivo_naoCorrente_credito = [];
  this.positivo_naoCorrente_debito = [];
  this.positivo_naoCorrente = [];
  this.negativo_corrente = [];
  this.negativo_naoCorrente = [];
  this.positivos = [];
  this.negativos = [];
  this.positivos_credito = [];
  this.positivos_debito = [];
}
let sNCsAtivo = new SNCsAtivo();
sNCsAtivo.positivo_naoCorrente_credito = [
  //Ativos fixos tangiveis
  431, // 268
  432, // 269
  433, // 270
  434, // 271
  435, // 272
  436, // 273
  437, // 274
  453, // 306
  455, // 310
  //Propriedades de investimento
  421, // 259
  422, // 260
  426, // 261
  452, // 305
  455, // 309
  //Goodwill
  4111, // 217
  4121, // 222
  4131, // 227
  441, // 289
  //Ativos intangiveis
  442, // 290
  443, // 291
  444, // 292
  446, // 293
  454, // 307
  455, // 311
  //Ativos biologicos
  3721, // 197
  3722, // 198
  39, // 215
  //Participações financeiras - método da equivalência patrimonial
  4111, // 216
  4121, // 221
  4131, // 226
  //Outros investimentos financeiros
  2123, // 18
  4113, // 219
  4114, // 220
  4115, // 220
  4116, // 220
  4117, // 220
  4118, // 220
  4119, // 220
  4122, // 223
  4123, // 224
  4124, // 225
  4125, // 225
  4126, // 225
  4127, // 225
  4128, // 225
  4129, // 225
  4132, // 228
  4133, // 229
  4134, // 230
  4135, // 230
  4136, // 230
  4137, // 230
  4138, // 230
  4139, // 230
  4141, // 231
  4142, // 232
  4143, // 233
  4144, // 233
  4145, // 233
  4146, // 233
  4147, // 233
  4148, // 233
  4149, // 233
  4151, // 234
  4158, // 235
  451, // 304
  455, // 308
  //Créditos a receber
  266, // 112
  2713, // 129
  //Ativos por impostos diferidos
  133 // 133
];
sNCsAtivo.positivo_naoCorrente_debito = [
  //Creditos a receber
  2381, // 62
  2382, // 64
  268, // 114
  2711, // 125
  2712, // 127
  278 // 139
];
sNCsAtivo.positivo_corrente_credito = [
  //Inventários
  321, // 156
  322, // 156
  323, // 156
  324, // 156
  327, // 156
  328, // 156
  325, //166
  326, //167
  331, //171
  332, // 172
  333, // 173
  334, // 174
  335, // 175
  336, // 176
  337, // 176
  338, // 176
  341, // 183
  342, // 183
  343, // 183
  344, // 183
  345, // 183
  347, // 183
  348, // 183
  346, // 184
  351, // 187
  352, // 188
  353, // 189
  354, // 189
  355, // 189
  356, // 189
  357, // 189
  358, // 189
  361, // 193
  362, // 193
  363, // 193
  364, // 193
  365, // 193
  366, // 193
  367, // 193
  368, // 193
  39, // 209
  39, // 210
  39, // 211
  39, // 212
  39, // 213
  //Ativos biológicos
  3711, // 195
  3712, // 196
  39, // 214
  //Estado e outros entes públicos
  241, // 71
  2431, // 73
  2432, // 74
  2434, // 76
  2435, // 77
  2437, // 79
  2438, // 80
  2439, // 81
  244, // 82
  245, // 83
  246, // 84
  248, // 85
  //Capital subscrito e não relizado
  106, // 186
  107, // 187
  //Outros créditos a receber
  228, // 51
  2381, // 61
  2382, // 63
  263, // 108
  266, // 111
  2713, // 128
  2721, // 130
  //Diferimentos
  146, // 146
  //Ativos financeiros detidos para negociação
  1411, // 4
  1421, // 6
  //Outros ativos financeiros
  1431, // 8
  //Ativos não correntes detidos para venda
  46, // 320
  46, // 321
  46, // 322
  46, // 323
  46, // 324
  //Caixa e deósitos bancários
  11 // 1
];
sNCsAtivo.positivo_corrente_debito = [
  //Clientes
  2111, // 10
  2112, // 11
  2113, // 12
  2114, // 13
  2115, // 14
  2116, // 15
  2121, // 16
  2122, // 17
  2123, // 18
  2124, // 19
  2125, // 20
  2126, // 21
  213, // 22
  214, // 22
  215, // 22
  216, // 22
  217, // 22
  //Outros creditos a receber
  2211, // 37
  2212, // 38
  2213, // 39
  2214, // 40
  2215, // 41
  2216, // 42
  2221, // 43
  2222, // 44
  2223, // 45
  2224, // 46
  2225, // 47
  2226, // 48
  223, // 49
  224, // 49
  226, // 49
  227, // 49
  225, // 50
  2312, // 55
  2322, // 56
  264, // 109
  265, // 110
  268, // 113
  2711, // 124
  2712, // 126
  278, // 138
  12, // 2
  13 // 3
];
sNCsAtivo.negativo_naoCorrente = [
  //Ativos fixos tangíveis
  438, // 275
  438, // 276
  438, // 277
  438, // 278
  438, // 279
  438, // 280
  438, // 281
  439, // 282
  439, // 283
  439, // 284
  439, // 285
  439, // 286
  439, // 287
  439, // 288
  459, // 314
  459, // 318
  //Propriedades de investimento
  428, // 262
  428, // 263
  428, // 264
  428, // 265
  429, // 266
  429, // 267
  459, // 313
  459, // 317
  //Goodwill
  41, // 236
  41, // 237
  41, // 238
  419, // 240
  419, // 245
  419, // 250
  448, // 294
  449, // 299
  //Ativos intangiveis
  448, // 295
  448, // 296
  448, // 297
  448, // 298
  449, // 300
  449, // 301
  449, // 302
  449, // 303
  459, // 315
  459, // 319
  //Ativos biologicos
  37, // 200
  37, // 202
  //Participações financeiras - método da equivalência patrimonial
  419, // 239
  419, // 244
  419, // 249
  //Outros investimentos financeiros
  419, // 241
  419, // 242
  419, // 243
  419, // 246
  419, // 247
  419, // 248
  419, // 251
  419, // 252
  419, // 253
  419, // 254
  419, // 255
  419, // 256
  419, // 257
  419, // 258
  459, // 312
  459, // 316
  //Créditos a receber
  239, // 68
  239, // 70
  269, // 121
  269, // 123
  279, // 141
  279, // 145
  //Ativos por impostos diferidos
  279 // 143
];
sNCsAtivo.negativo_corrente = [
  //Inventários
  329, // 168
  329, // 169
  329, // 170
  339, // 177
  339, // 178
  339, // 179
  339, // 180
  339, // 181
  339, // 182
  349, // 185
  349, // 186
  359, // 190
  359, // 191
  359, // 192
  36, // 194
  //Ativos biológicos
  37, // 199
  37, // 201
  //Clientes
  219, // 24
  219, // 25
  219, // 26
  219, // 27
  219, // 28
  219, // 29
  219, // 30
  219, // 31
  219, // 32
  219, // 33
  219, // 34
  219, // 35
  219, // 36
  //Capital subscrito e não relizado
  269, // 115
  269, // 116
  //Outros créditos a receber
  228, // 52
  239, // 65
  239, // 66
  239, // 67
  239, // 69
  //Diferimentos
  269, // 117
  269, // 118
  269, // 119
  269, // 120
  269, // 122
  279, // 140
  279, // 142
  279, // 144
  //Ativos não correntes detidos para vendaF
  469, // 326
  469, // 237
  469, // 328
  469, // 329
  469 // 330
];
sNCsAtivo.negativos = sNCsAtivo.negativo_corrente.concat(
  sNCsAtivo.negativo_naoCorrente
);
sNCsAtivo.positivos = sNCsAtivo.positivo_corrente_credito.concat(
  sNCsAtivo.positivo_corrente_debito.concat(
    sNCsAtivo.positivo_naoCorrente_credito.concat(
      sNCsAtivo.positivo_naoCorrente_debito
    )
  )
);
sNCsAtivo.positivos_debito = sNCsAtivo.positivo_corrente_debito.concat(
  sNCsAtivo.positivo_naoCorrente_debito
);
sNCsAtivo.positivos_credito = sNCsAtivo.positivo_corrente_credito.concat(
  sNCsAtivo.positivo_naoCorrente_credito
);
sNCsAtivo.positivo_corrente = sNCsAtivo.positivo_corrente_credito.concat(
  sNCsAtivo.positivo_corrente_debito
);
sNCsAtivo.positivo_naoCorrente = sNCsAtivo.positivo_naoCorrente_credito.concat(
  sNCsAtivo.positivo_naoCorrente_debito
);
sNCsAtivo.positivo_corrente_credito.sort(sortNumber).reverse();
sNCsAtivo.positivo_corrente_debito.sort(sortNumber).reverse();
sNCsAtivo.positivo_corrente.sort(sortNumber).reverse();
sNCsAtivo.positivo_naoCorrente_credito.sort(sortNumber).reverse();
sNCsAtivo.positivo_naoCorrente_debito.sort(sortNumber).reverse();
sNCsAtivo.positivo_naoCorrente.sort(sortNumber).reverse();
sNCsAtivo.negativo_corrente.sort(sortNumber).reverse();
sNCsAtivo.negativo_naoCorrente.sort(sortNumber).reverse();
sNCsAtivo.positivos.sort(sortNumber).reverse();
sNCsAtivo.negativos.sort(sortNumber).reverse();
sNCsAtivo.positivos_credito.sort(sortNumber).reverse();
sNCsAtivo.positivos_debito.sort(sortNumber).reverse();

function sortNumber(a, b) {
  return a - b;
}
module.exports = sNCsAtivo;
