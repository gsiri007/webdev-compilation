const search = document.getElementById('search-bar');
const bookCardContainer = document.getElementById('book-card-container');
const stamp = document.getElementById('stamp')

document.getElementById('search-btn').addEventListener('click', async () => {
  const searchValue = search.value;
  search.value = "";

  if (!searchValue) {
    return;
  }

  stamp.classList.add('disabled');

  const baseURL = "https://openlibrary.org/search.json";
  const title   = searchValue.split(' ').join('+');
  const path    = `${baseURL}?title=${title}`;

  let data = ""

  try {
    const reponse = await fetch(path);

    if (!reponse.ok) {
      console.error(`Request failed with errror code ${reponse.status}`)
    }

    data = await reponse.json();

  } catch (error) {
    console.error(`ERROR: ${error}`);
  }

  const books = data.docs;

  let bookCards = [];

  for (let i = 0; i < 10 && i < books.length; ++i) {

    let coverID = books[i]?.cover_i;
    let coverSrc = '';

    if (coverID) {
      coverSrc = `https://covers.openlibrary.org/b/ID/${coverID}-M.jpg`;
    } else {
      coverSrc = './img/book.png';
    }


    const bookCard = `
      <div id="book-card" class="book-card">
        <img class="book-cover"
            src="${coverSrc}"
        alt="">
        <div class="book-info">
          <h2 class="name">${books[i]?.title}</h2>
          <p class="author">${books[i]?.author_name[0]}</p>
          <p class="year">${books[i]?.first_publish_year}</p>
          <button
            class="add-btn"
            data-title="${books[i]?.title}"
            data-cover-src="${coverSrc}"
            data-author="${books[i]?.author_name[0]}"
            data-year="${books[i]?.first_publish_year}"
          >
            Add
          </button>
        </div>
      </div>`;

    bookCards.push(bookCard);
  }

  if (books.length === 0) {
    stamp.innerHTML = `
    <h2>
      Unable to find what  you're looking for. Please try another search.
    </h2>`;
    stamp.classList.remove('disabled');
  } else {
    bookCardContainer.innerHTML = bookCards.join('\n');
  }
});

document.getElementById("book-card-container").addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON' && e.target.getAttribute('class') === 'add-btn') {
    return;
  }

  const book = {
    title: e.target.dataset.title,
    cover: e.target.dataset.coverSrc,
    author: e.target.dataset.author,
    year: e.target.dataset.year
  };

  const key = Math.floor(Math.random() * 1000);

  localStorage.setItem(key, JSON.stringify(book));

  e.target.disabled = true;
});

