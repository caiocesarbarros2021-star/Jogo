
const palavras = [
    "JAVASCRIPT",
    "COMPUTADOR",
    "ESCOLA",
    "PROGRAMA",
    "INTERNET",
    "TECLADO",
    "GITHUB",
    "NAVEGADOR",
    "TECNOLOGIA",
    "DESENVOLVIMENTO"
];

let palavraSecreta = "";
let letrasUsadas = [];
let tentativas = 6;
let jogoFinalizado = false;

const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const elementoContador = document.getElementById("contador-letras");
const elementoLetra = document.getElementById("letra");
const elementoMensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

function sortearPalavra() {
    const indice = Math.floor(Math.random() * palavras.length);
    return palavras[indice];
}

function atualizarPalavra() {
    let exibicao = "";

    for (let i = 0; i < palavraSecreta.length; i++) {
        if (letrasUsadas.includes(palavraSecreta[i])) {
            exibicao += palavraSecreta[i] + " ";
        } else {
            exibicao += "_ ";
        }
    }

    elementoPalavra.textContent = exibicao.trim();
}

function atualizarStatus() {
    elementoTentativas.textContent = tentativas;
    elementoContador.textContent = letrasUsadas.length;

    if (letrasUsadas.length === 0) {
        elementoLetrasUsadas.textContent = "Nenhuma ainda";
    } else {
        elementoLetrasUsadas.textContent = letrasUsadas.join(" • ");
    }
}

function verificarVitoria() {
    for (let i = 0; i < palavraSecreta.length; i++) {
        if (!letrasUsadas.includes(palavraSecreta[i])) {
            return false;
        }
    }
    return true;
}

function finalizarJogo(vitoria) {
    jogoFinalizado = true;
    botaoTentar.disabled = true;
    elementoLetra.disabled = true;

    if (vitoria) {
        elementoMensagem.textContent = "Parabéns! Você descobriu a palavra!";
    } else {
        elementoMensagem.textContent = "Fim de jogo! A palavra era: " + palavraSecreta;
        atualizarPalavraCompleta();
    }
}

function atualizarPalavraCompleta() {
    elementoPalavra.textContent = palavraSecreta.split("").join(" ");
}

function tentarLetra() {
    if (jogoFinalizado) {
        return;
    }

    const letra = elementoLetra.value.trim().toUpperCase();

    if (!letra || !/^[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ]$/.test(letra)) {
        elementoMensagem.textContent = "Digite apenas uma letra.";
        elementoLetra.focus();
        return;
    }

    if (letrasUsadas.includes(letra)) {
        elementoMensagem.textContent = "Você já tentou essa letra!";
        elementoLetra.value = "";
        elementoLetra.focus();
        return;
    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        elementoMensagem.textContent = "Boa! Essa letra existe na palavra.";
    } else {
        tentativas--;
        elementoMensagem.textContent = "Essa letra não está na palavra. Tente outra!";
    }

    atualizarPalavra();
    atualizarStatus();
    elementoLetra.value = "";
    elementoLetra.focus();

    if (verificarVitoria()) {
        finalizarJogo(true);
    } else if (tentativas === 0) {
        finalizarJogo(false);
    }
}

function novaPartida() {
    palavraSecreta = sortearPalavra();
    letrasUsadas = [];
    tentativas = 6;
    jogoFinalizado = false;

    elementoLetra.disabled = false;
    botaoTentar.disabled = false;
    elementoLetra.value = "";
    elementoMensagem.textContent = "Boa sorte! Você consegue.";

    atualizarPalavra();
    atualizarStatus();
    elementoLetra.focus();
}

botaoTentar.addEventListener("click", tentarLetra);

elementoLetra.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        tentarLetra();
    }
});

botaoReiniciar.addEventListener("click", novaPartida);

novaPartida();
