import { reviews } from './reviews.js'

const reviewsContainer = document.getElementById("reviews-container");
const cartBtn = document.getElementById('cart-btn');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutBtnClose = document.getElementById('checkout-btn-close');
const btns = document.getElementsByClassName('btn');

// reviews animation
let currentIndex = 0;
function updateReviewText() {
    const review = reviews[currentIndex];
    reviewsContainer.innerHTML = `
        <p class="review">${review.name}: "${review.review}"</p>
    `;
}

function nextReview() {
    // Fade Out
    reviewsContainer.classList.toggle("reviews-container-hidden");

    // Wait for fade out to finish (500ms matches CSS)
    setTimeout(() => {
        // Update Index
        currentIndex = (currentIndex + 1) % reviews.length;

        // Change Content
        updateReviewText();

        // Fade In
        reviewsContainer.classList.toggle("reviews-container-hidden");
    }, 500);
}

// Initialize first review immediately (no animation)
updateReviewText();

// Trigger the next review animation every 10 seconds
setInterval(nextReview, 10000);

cartBtn.addEventListener('click', () => {
    checkoutModal.classList.remove('hide');

    for (const btn of btns) {
        btn.classList.add('btn-inactive');
    }

});

checkoutBtnClose.addEventListener('click', () => {
    checkoutModal.classList.add('hide');

    for (const btn of btns) {
        btn.classList.remove('btn-inactive');
    }

});
