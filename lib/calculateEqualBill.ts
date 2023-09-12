const calculateEqualBill = (
  beers: number,
  beerPrice: number,
  tip: boolean,
  tipPercent: number,
  totalPeople: number
) => {
  let beerCountPrice = parseFloat((beers * beerPrice).toFixed(2));
  if (tip) {
    const tipParsed = tipPercent / 100;
    const totalTip = beerCountPrice * tipParsed;
    beerCountPrice = parseFloat((beerCountPrice + totalTip).toFixed(2));
  }
  const beerDivideTotal = parseFloat((beerCountPrice / totalPeople).toFixed(2));

  return [beerCountPrice, beerDivideTotal];
};

export default calculateEqualBill;
