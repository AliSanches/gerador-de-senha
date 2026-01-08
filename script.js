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

const revert = (a) => {
    let res = '';
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    for (let x = 0; x < a.length; x++) {
        res += a[x];
    }

    return res;
}

const generate = () => {
    cPas.value = '';
    let gPas = '';

    for (let i = 0; i < nCon.value; i++) {
        if (cMin.checked) {
            gPas += alf[Math.floor(Math.random() * alf.length)];
            if (gPas.length === Number(nCon.value)) { break }
        }

        if (cMai.checked) {
            gPas += alf[Math.floor(Math.random() * alf.length)].toUpperCase();
            if (gPas.length === Number(nCon.value)) { break }
        }

        if (cNum.checked) {
            gPas += Math.floor(Math.random() * 10);
            if (gPas.length === Number(nCon.value)) { break }
        }

        if (cEsp.checked) {
            gPas += esp[Math.floor(Math.random() * esp.length)];
            if (gPas.length === Number(nCon.value)) { break }
        }
    }

    let res = revert(gPas);

    cPas.value = res;
}

cPas.addEventListener('input', (e) => { valid(e.target.value) });
cCop.addEventListener('click', copy);
cGer.addEventListener('click', generate);