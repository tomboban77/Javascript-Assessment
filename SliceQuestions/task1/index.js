const getPortfolioBreakdown=(portfolio)=> {
  if (!portfolio || portfolio?.length === 0) {
    return {
      total: 0,
      breakdown: [],
    };
  }

  let total = 0;
  for (let i = 0; i < portfolio.length; i++) {
    total += portfolio[i].value;
  }

  const breakdown = [];
  for (let i = 0; i < portfolio.length; i++) {
    const asset = portfolio[i];
    const percent = total > 0 ? Math.round((asset.value / total) * 100) : 0;

    breakdown.push({
      asset: asset.asset,
      percent: percent,
    });
  }

  return {
    total: total,
    breakdown: breakdown,
  };
}

const portfolio = [
  { asset: "Stocks", value: 50000 },
  { asset: "Bonds", value: 30000 },
  { asset: "Cash", value: 20000 },
];

console.log(getPortfolioBreakdown(portfolio));
