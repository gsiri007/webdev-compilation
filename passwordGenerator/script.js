const characters = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W",
    "X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t",
    "u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#",
    "$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"
];

const generateBtn = document.getElementById("generate-btn");
const passwordOneEl = document.getElementById("password-one-el");
const passwordTwoEl = document.getElementById("password-two-el");

generateBtn.addEventListener("click", () => {
    const passwordOne = generatePassword(characters, 15);
    const passwordTwo = generatePassword(characters, 15);

    passwordOneEl.textContent = passwordOne;
    passwordTwoEl.textContent = passwordTwo;

});

function generatePassword(charArr, passLength) {
    let password = "";
    for (let i = 0; i < passLength; i++) {
        const randIndex = Math.floor(Math.random() * charArr.length);
        password += charArr[randIndex];
    }

    return password;

}
