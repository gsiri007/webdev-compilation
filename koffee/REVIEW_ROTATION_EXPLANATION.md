# Review Rotation Script Explanation

This document explains the logic behind the review rotation script used in the project, including how it works step-by-step and why it is a scalable solution.

## The Code

Here is the corrected and functional `script.js`:

```javascript
const reviews = [
    {
        name: "Ashley",
        review: "Best place I had coffee in a while."
    },
    {
        name: "Robert",
        review: "Had a great time and a wonderful coffee at Koffee."
    }
]


const reviewsContainer = document.getElementById("reviews-container");
let currentIndex = 0;

function showReview() {
    const review = reviews[currentIndex];
    reviewsContainer.innerHTML = `
                <p class="review">${review.name}: "${review.review}"</p>
            `;
    currentIndex = (currentIndex + 1) % reviews.length;
}

// Initialize first review
showReview();

// Update every 10 seconds (10000 ms)
setInterval(showReview, 10000);
```

## Step-by-Step Explanation

### 1. The Data
```javascript
const reviews = [ ... ]
```
This is an array of objects. Each object represents a single review containing a `name` and the `review` text. This acts as the local "database" for the script.

### 2. Selecting the HTML Element
```javascript
const reviewsContainer = document.getElementById("reviews-container");
```
This line finds the `<div>` in the HTML where `id="reviews-container"`. This is the target container where the `<p>` tags will be injected.

### 3. Tracking the Current Review
```javascript
let currentIndex = 0;
```
A variable `currentIndex` is initialized at `0`. This tracks which review inside the array is currently being shown (e.g., 0 for Ashley, 1 for Robert).

### 4. The Display Function
```javascript
function showReview() {
    const review = reviews[currentIndex];
    // ...
```
Inside this function, the specific review object matching the `currentIndex` is retrieved from the array.

### 5. Updating the HTML
```javascript
    reviewsContainer.innerHTML = `
        <p class="review">${review.name}: "${review.review}"</p>
    `;
```
The content of the container is replaced with a new HTML string using the data from the `review` object. `innerHTML` is used so the browser parses the `<p>` tag as actual HTML.

### 6. The Loop Logic (The Magic Part)
```javascript
    currentIndex = (currentIndex + 1) % reviews.length;
}
```
This line calculates the index for the *next* iteration:
*   `currentIndex + 1` increments the count.
*   `% reviews.length` (Modulo operator) calculates the remainder.
    *   If index is 0: `(0+1) / 2` remainder is **1**.
    *   If index is 1: `(1+1) / 2` remainder is **0**.
    *   **Result:** It creates a perfect, infinite loop (`0 -> 1 -> 0 -> 1...`) automatically, ensuring the code never tries to access an index that doesn't exist.

### 7. Running the Code
```javascript
showReview();
setInterval(showReview, 10000);
```
*   `showReview()`: Called immediately so the user sees the first review as soon as the page loads.
*   `setInterval(...)`: Tells the browser to run the `showReview` function repeatedly every 10,000 milliseconds (10 seconds).

## Why This Approach Scales

This solution is highly scalable if you decide to add more reviews:

1.  **Dynamic Logic**: The use of `reviews.length` in the modulo calculation (`% reviews.length`) means the code automatically adapts to the array size. You can add 5, 50, or 100 reviews to the array, and the loop will handle it without any code changes.
2.  **Efficient Rendering**: The script replaces only the content inside the specific review container. It does not re-render the entire page, nor does it try to load all reviews into the DOM at once.
3.  **Maintenance**: Adding a new review is as simple as adding a new object to the `reviews` array. No logical code needs to be touched.
