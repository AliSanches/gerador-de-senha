const cPas = document.querySelector("#password");
const cCop = document.querySelector("#copy");

const nCon = document.querySelector("#con");
const cMai = document.querySelector("#mai");
const cMin = document.querySelector("#min");
const cNum = document.querySelector("#num");
const cEsp = document.querySelector("#esp");

nCon.value = 0;

const copy = async () => {
    await navigator.clipboard.writeText(cPas.value);
}

const schema = (string) => {
    for (let i = 0; i < string.length; i++) {
        if (string[i] === '') {

        }
    }
}

const valid = (e) => {
    let con = e.length;
    nCon.value = con;

    schema(e);
}

cPas.addEventListener('input', (e) => { valid(e.target.value) });
cCop.addEventListener('click', copy);