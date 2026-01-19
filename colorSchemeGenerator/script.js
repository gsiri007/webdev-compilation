const colorColumns = document.getElementsByClassName('color-column');
const hexValues = document.getElementsByClassName('hex-value');

const colorForm = document.getElementById('color-form');
colorForm.addEventListener('submit', e => {
  e.preventDefault();

  const colorData = new FormData(colorForm);

  const hex = colorData.get('seed').slice(1);
  const mode = colorData.get('scheme-mode');

  const path = `https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}`;

  fetch(path)
    .then(response => response.json())
    .then(data => {
      let colorArray = [];

      for (const color of data?.colors) {
        colorArray.push(color.hex?.value);
      }

      (function renderColors(columns) {
        Array.from(columns).forEach((column, index) => {
          column.setAttribute("data-hex", colorArray[index]);
          column.style.backgroundColor = colorArray[index];
        });
      })(colorColumns);

      Array.from(hexValues).forEach((hexValue, index) => {
        hexValue.textContent = `${colorArray[index]}`;
      });

    });
});

document.getElementById('scheme-container').addEventListener('click', e => {
  navigator.clipboard.writeText(e.target.dataset.hex);
});
