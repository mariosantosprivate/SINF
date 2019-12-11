class SNCsAtivo {
  constructor() {
    this.positivo.corrente.credito = [];
    this.positivo.corrente.debito = [];
    this.positivo.naoCorrente.credito = [];
    this.positivo.naoCorrente.debito = [];
    this.negativos.corrente = [];
    this.negativos.naoCorrente = [];
    this.positivos = [];
  }
}
let sNCsAtivo = Object.create(SNCsAtivo.prototype);
sNCsAtivo.positivo.corrente.credito = [
  //Ativos fixos tangiveis
  268,
  269,
  270,
  271,
  272,
  273,
  274,
  306,
  310,
  //Propriedades de investimento
  259,
  260,
  261,
  305,
  309,
  //Goodwill
  217,
  222,
  227,
  289,
  //Ativos intangiveis
  290,
  291,
  292,
  293,
  307,
  311,
  //Ativos biologicos
  197,
  198,
  215,
  //Participações financeiras - método da equivalência patrimonial
  216,
  221,
  226,
  //Outros investimentos financeiros
  18,
  219,
  220,
  223,
  224,
  225,
  228,
  229,
  230,
  231,
  232,
  233,
  234,
  235,
  304,
  308,
  //Créditos a receber
  112,
  129,
  //Ativos por impostos diferidos
  133
];
sNCsAtivo.positivo.corrente.dedito = [
  //Creditos a receber
  62,
  64,
  114,
  125,
  127,
  139
];
sNCsAtivo.positivo.naoCorrente.credito = [
  //Inventários
  165,
  166,
  167,
  171,
  172,
  173,
  174,
  175,
  176,
  183,
  184,
  187,
  188,
  189,
  193,
  209,
  210,
  211,
  212,
  213,
  //Ativos biológicos
  195,
  196,
  214,
  //Estado e outros entes públicos
  71,
  73,
  74,
  76,
  77,
  79,
  80,
  81,
  82,
  83,
  84,
  85,
  //Capital subscrito e não relizado
  106,
  107,
  //Outros créditos a receber
  51,
  61,
  63,
  108,
  111,
  128,
  130,
  //Diferimentos
  146,
  //Ativos financeiros detidos para negociação
  4,
  6,
  //Outros ativos financeiros
  8,
  //Ativos não correntes detidos para venda
  320,
  321,
  322,
  323,
  324,
  //Caixa e deósitos bancários
  1
];
sNCsAtivo.positivo.naoCorrente.dedito = [
  //Clientes
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  //Outros creditos a receber
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  55,
  56,
  109,
  110,
  113,
  124,
  126,
  138,
  2,
  3
];
sNCsAtivo.negativo.corrente = [
  //Ativos fixos tangíveis
  275,
  276,
  277,
  278,
  279,
  280,
  281,
  282,
  283,
  284,
  285,
  286,
  287,
  288,
  314,
  318,
  //Propriedades de investimento
  262,
  263,
  264,
  265,
  266,
  267,
  313,
  317,
  //Goodwill
  236,
  237,
  238,
  240,
  245,
  250,
  294,
  299,
  //Ativos intangiveis
  295,
  296,
  297,
  298,
  300,
  301,
  302,
  303,
  315,
  319,
  //Ativos biologicos
  200,
  202,
  //Participações financeiras - método da equivalência patrimonial
  239,
  244,
  249,
  //Outros investimentos financeiros
  241,
  242,
  243,
  246,
  247,
  248,
  251,
  252,
  253,
  254,
  255,
  256,
  257,
  258,
  312,
  316,
  //Créditos a receber
  68,
  70,
  121,
  123,
  141,
  145,
  //Ativos por impostos diferidos
  143
];
sNCsAtivo.negativo.naoCorrente = [
  //Inventários
  168,
  169,
  170,
  177,
  178,
  179,
  180,
  181,
  182,
  185,
  186,
  190,
  191,
  192,
  194,
  //Ativos biológicos
  199,
  201,
  //Clientes
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  //Capital subscrito e não relizado
  115,
  116,
  //Outros créditos a receber
  52,
  65,
  66,
  67,
  69,
  //Diferimentos
  117,
  118,
  119,
  120,
  122,
  140,
  142,
  144,
  //Ativos não correntes detidos para vendaF
  326,
  327,
  328,
  329,
  330
];
sNCsAtivo.negativos = sNCsAtivo.negativo.corrente.concat(
  sNCsAtivo.negativo.naoCorrente
);
sNCsAtivo.positivos = sNCsAtivo.positivo.corrente.creditoconcat(
  sNCsAtivo.positivo.corrente.dedito.concat(
    sNCsAtivo.positivo.naoCorrente.credito.concat(
      sNCsAtivo.positivo.naoCorrente.dedito
    )
  )
);
module.exports = sNCsAtivo;
