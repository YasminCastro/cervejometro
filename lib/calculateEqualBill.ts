const calculateEqualBill = (total: number, tipPercent: number) => {
  const tipParsed = tipPercent / 100;
  const totalTip = total * (tipParsed / 100);

  return total + totalTip;
};

export default calculateEqualBill;
