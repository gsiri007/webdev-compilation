import { menuArray } from './data.js';

/* vars */
let totalOrderPrice = 0;
let totalOrderCount = 0;
let isOrderConfirmed = false;

/* clear payment form */
const clearPaymentForm = function() {
  const inputFields = document.getElementsByClassName('payment-details-input');
  for (let inputField of inputFields) {
    inputField.value = '';
  }
};

/* add order item */
const itemsContainer = document.getElementById('items-container');
itemsContainer.addEventListener('click', e => {
  if (!e.target.dataset.itemId) {
    return;
  }

  const targetItem = menuArray.filter(
    itemObj => itemObj.id == e.target.dataset.itemId
  )[0];

  // create order element
  const orderItem = document.createElement('li');
  orderItem.innerHTML += `
    <div class="order-item">
      <h3>${targetItem.name}</h3>
      <button class="item-remove-btn" data-item-id="${targetItem.id}">remove</button>
      <p>$${targetItem.price}</p>
    </div>
  `;

  // update total order price and count
  totalOrderPrice += targetItem.price;
  totalOrderCount++;
  document.getElementById('order-total-price').textContent = `$${totalOrderPrice}`;

  // update UI
  if (isOrderConfirmed) {
    document.getElementById('payment-confirmation-container').classList.toggle('hidden');

    // update the order state
    isOrderConfirmed = !isOrderConfirmed;
  }
  document.getElementById('order-summary').appendChild(orderItem);
  document.getElementById('order-summary-container').classList.remove('hidden');
});

/* remove order item */
document.addEventListener('click', e => {
  if (!e.target.classList.contains('item-remove-btn')) {
    return;
  }

  const targetItem = menuArray.filter(
    itemObj => itemObj.id == e.target.dataset.itemId
  )[0];

  // update total order price and count
  totalOrderPrice -= targetItem.price;
  totalOrderCount--;
  document.getElementById('order-total-price').textContent = `$${totalOrderPrice}`;

  e.target.parentNode.remove();

  if (totalOrderCount === 0) {
    document.getElementById('order-summary-container').classList.add('hidden');

    // clear the payment confirmation message
    document.getElementById('payment-confirmation-message').innerHTML = '';

    // clear payment form
    clearPaymentForm();
  }
});

/* payment modal */
const orderCompleteBtn = document.getElementById('order-complete-btn');
const paymentModal = document.getElementById('payment-modal');
const rootContainer = document.getElementById('root-container');

// open payment modal
orderCompleteBtn.addEventListener('click', () => {
  orderCompleteBtn.classList.toggle('hidden');
  paymentModal.classList.toggle('hidden');
  rootContainer.classList.toggle('inactive');
});
// exit payment modal
document.getElementById('payment-modal-exit-btn').addEventListener('click', () => {
  paymentModal.classList.toggle('hidden');
  rootContainer.classList.toggle('inactive');
  orderCompleteBtn.classList.toggle('hidden');
});

// payment confirmation
document.getElementById('payment-form').addEventListener('submit', e => {
  e.preventDefault();

  // collecting form data
  const paymentData = new FormData(document.getElementById('payment-form'));

  // payment confirmation message
  document.getElementById('payment-confirmation-message').innerHTML = `
    Thanks, ${paymentData.get('card-holder-name')}! Your order is on its way!
  `;

  // clear current order summary
  document.getElementById('order-summary').innerHTML = '';

  // update order price and count
  totalOrderPrice = 0;
  totalOrderCount = 0;

  // clear payment form
  clearPaymentForm();

  // update the order state
  isOrderConfirmed = !isOrderConfirmed;

  // update UI
  orderCompleteBtn.classList.toggle('hidden')
  document.getElementById('order-summary-container').classList.add('hidden');
  rootContainer.classList.toggle('inactive');
  document.getElementById('payment-confirmation-container').classList.toggle('hidden');
  paymentModal.classList.toggle('hidden');

});

/* create product items */
const createItems = function() {
  let itemsHTML = '';

  menuArray.forEach((itemObj) => {
    itemsHTML += `
      <div class="item item-seperator">
        <img src="./img/${itemObj.img}" alt="${itemObj.alt}">
        <div class="item-details">
          <h3>${itemObj.name}</h3>
          <p class="item-ingredients">${itemObj.ingredients.join(", ")}</p>
          <p>$${itemObj.price}</p>
        </div>
        <button class="item-add-btn" data-item-id="${itemObj.id}" type="">+</button>
      </div>
    `;
  });

  console.log(itemsHTML);
  return itemsHTML;
}

/* render product items */
const renderItems = function() {
  document.getElementById('items-container').innerHTML = createItems();
}

renderItems();
