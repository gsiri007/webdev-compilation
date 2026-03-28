if (localStorage.length !== 0) {

  document.getElementById('stamp').classList.add('disabled');
  let bookCards = '';

  for (let i = 0; i < localStorage.length; ++i) {
    const key = localStorage.key(i);
    const book = JSON.parse(localStorage.getItem(key));


    bookCards += `
      <div id="book-card" class="book-card">
        <img class="book-cover"
            src="${book.cover}"
        alt="">
        <div class="book-info">
          <h2 class="name">${book.title}</h2>
          <p class="author">${book.author}</p>
          <p class="year">${book.year}</p>
        </div>
      </div>`;

  }

  document.getElementById('book-card-container').innerHTML += bookCards;

}

