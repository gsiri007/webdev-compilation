const priceDisplay = document.getElementById('price-display');
const summaryDialog = document.getElementsByTagName('dialog')[0];
const investInput = document.getElementById('invest-input');
const investmentSummary = document.getElementById('investment-summary');

let goldOzPrice = null;

document.getElementById('invest-btn').addEventListener('click', async e => {
  e.preventDefault();

  const investAmount = investInput.value;
  const goldBought = (investAmount / goldOzPrice).toFixed(2);

  // invalid investments
  if (investAmount <= 0) {
    return;
  }

  try {
    const response = await fetch('/api/invest', {
      method: 'POST',
      headers: {
        'Content-Type': 'appication/json'
      },
      body: JSON.stringify({
        timestamp:  new Date(),
        investment: investAmount,
        soldOz: goldBought,
        priceOz: goldOzPrice
      })
    });

    if (response.ok) {
      summaryDialog.showModal();
      investmentSummary.textContent = `You just bought ${goldBought} ounces (ozt) for £${investAmount}. \n You will receive documentation shortly.`;
    }

  } catch (error) {
    console.log(error.message);
  }

});

document.getElementById('summary-ok-btn').addEventListener('click', () => {
  summaryDialog.close();
  investInput.value = '';
})

const getGoldEvent = new EventSource('/api/gold/price')

getGoldEvent.onmessage = event => {
  const data = event.data;
  goldOzPrice = JSON.parse(data).price;

  priceDisplay.textContent = goldOzPrice;
};

getGoldEvent.onerror = error => {
  console.log(error);
}
