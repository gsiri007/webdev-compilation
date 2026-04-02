const bookCardContainer = document.getElementById('book-card-container');
const stamp = document.getElementById('stamp');

if (localStorage.length !== 0) {

  stamp.classList.add('disabled');
  let bookCards = '';

  for (let i = 0; i < localStorage.length; ++i) {
    const key = localStorage.key(i);
    const book = JSON.parse(localStorage.getItem(key));


    bookCards += `
      <div id="book-card" class="book-card" data-key="${key}">
        <img class="book-cover"
            src="${book.cover}"
        alt="">
        <div class="book-info">
          <h2 class="name">${book.title}</h2>
          <p class="author">${book.author}</p>
          <p class="year">${book.year}</p>
          <button
            class="remove-btn"
            data-key="${key}"
          > remove
          </button>
        </div>
      </div>`;

  }

  bookCardContainer.innerHTML += bookCards;
}

bookCardContainer.addEventListener('click', e => {
  if (e.target.getAttribute('class') !== 'remove-btn') {
    return;
  }

  const key = e.target.dataset.key
  localStorage.removeItem(key)

  for (const bookCard of bookCardContainer.children) {
    if (bookCard.dataset.key === key) {
      bookCard.remove();
    }
  }

  if (bookCardContainer.children.length === 0) {
    stamp.classList.remove('disabled')
  }

});
