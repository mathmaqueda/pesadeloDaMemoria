// pega do localStorage
const minutos = localStorage.getItem("minutos");
const segundos = localStorage.getItem("segundos");
const acertos = localStorage.getItem("acertos");
const erros = localStorage.getItem("erros");

// pega tags
const outMinutos = document.querySelector("#outMinutos");
const outSegundos = document.querySelector("#outSegundos");
const outAcertos = document.querySelector("#outAcertos");
const outErros = document.querySelector("#outErros");
const outPontuacao = document.querySelector("#outPontuacao")

// calcula pontuação
const pontuacao = (acertos*50) - ((erros*5) + (minutos*10) + (segundos*0.5));

// imprime
outMinutos.textContent = minutos.toString().padStart(2, '0');
outSegundos.textContent = segundos.toString().padStart(2, '0');
outAcertos.textContent = acertos.toString().padStart(2, '0');
outErros.textContent = erros.toString().padStart(2, '0');
outPontuacao.textContent = pontuacao.toString().padStart(3, '0');;

