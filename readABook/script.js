const search = document.getElementById('search-bar');

document.getElementById('search-btn').addEventListener('click', async () => {
  const searchValue = search.value;

  if (!searchValue) {
    return;
  }

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

  for (let i = 0; i < 10 && i < books.length; ++i) {
    const html = `
      <img src="https://covers.openlibrary.org/b/ID/${books[i].cover_i}-M.jpg" />
    `
    console.log(html);
  }


  search.value = "";
  
});
