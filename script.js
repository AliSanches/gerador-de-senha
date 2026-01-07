const cPas = document.querySelector("#password");
const cCop = document.querySelector("#copy");
const cGer = document.querySelector("#generate");

const nCon = document.querySelector("#con");
const cMai = document.querySelector("#mai");
const cMin = document.querySelector("#min");
const cNum = document.querySelector("#num");
const cEsp = document.querySelector("#esp");

nCon.value = 1;

const alf = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'w', 'x', 'y', 'z'
];

const esp = [
    '!', '@', '#', '$', '%', '^', '&', '*',
    '(', ')', '-', '_', '=', '+',
    '[', ']', '{', '}',
    ';', ':', "'", '"',
    ',', '.', '<', '>', '/',
    '?', '\\', '|', '`', '~'
];

const copy = async () => {
    await navigator.clipboard.writeText(cPas.value);
}

const schema = (string) => {
    let isMin = false;
    let isMai = false;
    let isNum = false;
    let isEsp = false;
    cMai.checked = false;
    cMin.checked = false;
    cNum.checked = false;
    cEsp.checked = false;

    for (let i = 0; i < string.length; i++) {
        if (string[i] === ' ') {
            throw new Error('Não pode conter espaços vazios!');
        }

        for (let x = 0; x < alf.length; x++) {
            if (string[i] === alf[x]) {
                isMin = true;
                break;
            }

            if (string[i] === alf[x].toUpperCase()) {
                isMai = true;
                break;
            }

            for (let y = 0; y < 10; y++) {
                if (Number(string[i]) === y) {
                    isNum = true;
                    break;
                }
            }

            for (let z = 0; z < esp.length; z++) {
                if (string[i] === esp[z]) {
                    isEsp = true;
                    break;
                }
            }
        }
    }

    if (isMai) {
        cMai.checked = true;
    }
    if (isMin) {
        cMin.checked = true;
    }
    if (isNum) {
        cNum.checked = true;
    }
    if (isEsp) {
        cEsp.checked = true;
    }
}

const valid = (e) => {
    try {
        schema(e);
    } catch (error) {
        // Mostra na tela se quiser...
    }
}

const generate = () => {
    cPas.value = '';
    let gPas = '';
    const random = [];

    for (let i = 0; i < Number(nCon.value); i++) {
        if (cMai.checked) { random.push(alf[Math.floor(Math.random() * alf.length)]) }
        if (cMin.checked) { random.push(alf[Math.floor(Math.random() * alf.length)].toUpperCase()) }
        if (cNum.checked) { random.push(alf[Math.floor(Math.random() * 9)]) }
        if (cEsp.checked) { random.push(alf[Math.floor(Math.random() * esp.length)]) }

        if (!Number(nCon.value) === i) {
            gPas = gPas + random[i];
        }
    }

    cPas.value = gPas;
}

cPas.addEventListener('input', (e) => { valid(e.target.value) });
cCop.addEventListener('click', copy);
cGer.addEventListener('click', generate);