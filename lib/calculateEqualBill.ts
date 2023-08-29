const calculateEqualBill = (
  beers: number,
  beerPrice: number,
  tip: boolean,
  tipPercent: number,
  totalPeople: number
) => {
  let beerTotalPrice = parseFloat((beers * beerPrice).toFixed(2));
  if (tip) {
    const tipParsed = tipPercent / 100;
    const totalTip = beerTotalPrice * tipParsed;
    beerTotalPrice = beerTotalPrice + totalTip;
  }
  const beerDivideTotal = parseFloat((beerTotalPrice / totalPeople).toFixed(2));

  return [beerTotalPrice, beerDivideTotal];
};

export default calculateEqualBill;
