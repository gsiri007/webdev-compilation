export const getGoldPrice = () => {
  let goldPrice = 0;

  do {
    goldPrice = Math.random() * 10000;
  } while (goldPrice < 2000 || goldPrice > 4000);

  return goldPrice.toFixed(2);
};


