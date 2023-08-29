class User {
  name: string;
  first: number; // cerveja na qual o usuário chegou
  last: number; // última cerveja que o usuário bebeu
  tip: boolean; // última cerveja que o usuário bebeu
  tipPercent: number; // última cerveja que o usuário bebeu

  constructor(
    name: string,
    first: number,
    last: number,
    tip: boolean,
    tipPercent: number
  ) {
    this.name = name;
    this.first = first;
    this.last = last;
    this.tip = tip;
    this.tipPercent = tipPercent;
  }
}

export function calculateProportionalBill(
  users: User[],
  totalBeers: number,
  beerCost: number,
  tip: boolean,
  tipPercent: number
): { [key: string]: number } {
  let individualBills: { [key: string]: number } = {};

  // Inicializar contas individuais
  users.forEach((user) => {
    individualBills[user.name] = 0;
  });

  for (let currentBeer = 1; currentBeer <= totalBeers; currentBeer++) {
    // Verificar quantas pessoas estão bebendo esta cerveja
    const currentDrinkers = users.filter(
      (user) => user.first <= currentBeer && user.last >= currentBeer
    );

    const numDrinkers = currentDrinkers.length;

    // Se ninguém está bebendo essa cerveja, continue para a próxima iteração
    if (numDrinkers === 0) continue;

    // Dividir o custo desta cerveja entre os bebedores atuais
    const costThisBeer = beerCost / numDrinkers;

    currentDrinkers.forEach((drinker) => {
      individualBills[drinker.name] += costThisBeer;
    });
  }

  for (const name in individualBills) {
    // Arredondar a conta para cada pessoa para duas casas decimais
    individualBills[name] = parseFloat(individualBills[name].toFixed(2));

    if (tip) {
      const tipParsed = tipPercent / 100;
      const totalTip = individualBills[name] * tipParsed;
      individualBills[name] = individualBills[name] + totalTip;
    }
  }

  return individualBills;
}
