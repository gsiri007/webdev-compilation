const meterToFeet = 3.281;
const leterToGallon = 0.264;
const kiloToPound = 2.204;

const convertBtn = document.getElementById("convert-btn");
const inputEl = document.getElementById("input-el");
const outputLenEl = document.getElementById("output-len-el");
const outputVolEl = document.getElementById("output-vol-el");
const outputMassEl = document.getElementById("output-mass-el");

convertBtn.addEventListener("click", () => {
    const inputVal = inputEl.value;

    outputLenEl.textContent =
        `${inputVal} meters = ${(inputVal * meterToFeet).toFixed(3)} feet | ${inputVal} feet = ${(inputVal / meterToFeet).toFixed(3)} meters`;

    outputVolEl.textContent =
        `${inputVal} liters = ${(inputVal * leterToGallon).toFixed(3)} gallons | ${inputVal} gallons = ${(inputVal / leterToGallon).toFixed(3)} liters`;

    outputMassEl.textContent =
        `${inputVal} kilos = ${(inputVal * kiloToPound).toFixed(3)} pounds | ${inputVal} pounds = ${(inputVal / kiloToPound).toFixed(3)} kilos`;
});
