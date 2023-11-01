const tamanho = localStorage.getItem("tam"); //variável tamanho passada da outra página
const JOGO = criaJogo(tamanho); //variável jogo (vetor), chama função
const susto = Math.floor(Math.random() * JOGO.length);

// cria tabela-jogo
const tabelaJogo = criaTabelaJogo(tamanho);

//monta primeiro lado
montaJogo(JOGO, tabelaJogo);

function criaJogo(tamanho) {
    const array = Array.from({ length: tamanho }, (_, index) => Math.floor(index / 2) + 1); //cria array ordenado
    for (let i = tamanho - 1; i > 0; i--) { //embaralha usando Fisher-Yates
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function criaTabelaJogo(tamanho) { //passa tamanho para a função e ela cria a tabelaJogo e retorna ela para ser
    const tabelaJogo = document.createElement("div"); // usada para criar os outros elementos
    tabelaJogo.className = "tabela-jogo";

    //classe de acordo com a dificuldade
    if(tamanho == 16) {
        tabelaJogo.classList.add('tabela-jogo-facil');
    } else if(tamanho == 24) {
        tabelaJogo.classList.add('tabela-jogo-medio');
    } else {
        tabelaJogo.classList.add('tabela-jogo-dificil');
    }
    const section = document.querySelector("#section-jogo");

    //afilia tabela ao section
    section.appendChild(tabelaJogo);
    return tabelaJogo;
}

function montaJogo(JOGO, tabelaJogo) {
    
    JOGO.forEach((carta, indice) => {
        const tagCarta = document.createElement("div");
        tagCarta.classList.add('cartas');
        if(carta === JOGO[susto]) {
            tagCarta.classList.add('susto');
        }
        tagCarta.innerHTML = `
        <div class="cartaFrente">
            <img class="imgCarta" src="../img/${carta}.png">
        </div>
        <div class="cartaTras"></div>
        `;
        tabelaJogo.appendChild(tagCarta);
        tagCarta.addEventListener("click", () => virarCarta(carta, tagCarta));
    })
    
}

function executaSusto() {
    const imagem = document.querySelector(".imagem-susto");
    const audio = document.querySelector(".audio-susto");
    audio.currentTime = 0; //coloca o tempo do audio para 0
    audio.play();
    imagem.style.visibility = "visible";
    imagem.style.display = "block"
    setTimeout(() => {
        imagem.style.display = "none"
        imagem.style.visibility = "hidden";
        audio.pause();
    }, 3000);
}

// Timer
// elementos
const outMinutos = document.querySelector("#outMinutos");
const outSegundos = document.querySelector("#outSegundos");

// variaveis
let intervalo;
let segundos = 0;
let minutos = 0;

function timer() {
    intervalo = setInterval(() => {  

        segundos++;
        if(segundos == 60) {
            minutos++;
            segundos = 0;
        }

        outMinutos.textContent = minutos.toString().padStart(2, '0')
        outSegundos.textContent = segundos.toString().padStart(2, '0');
    }, 1000);
}

// Lógica

//variáveis pontuação
const outTempo = document.querySelector("#tempo");
const outAcertos = document.querySelector("#acertos");
const outErros = document.querySelector("#erros");
let acertos = 0;
let erros = 0;
let cliqueHabilitado = true
let primeiraCarta = null;
let iniciou = false;

function virarCarta(carta, tagCarta) {
    if(!iniciou) {
        timer();
        iniciou = true;
    }
    if(!cliqueHabilitado) {
        return;
    }
    if(!tagCarta.classList.contains("virarCarta")) { //se a classe virarCarta não está contida
        tagCarta.classList.add("virarCarta");
        if(primeiraCarta === null) { //se não tiver primeira carta...
            primeiraCarta = { carta, tagCarta }; //primeira carta recebe a carta atual
            return; //retorna
        } else {
            cliqueHabilitado = false;
            if(primeiraCarta.carta === carta) { // se é par

                acertos++; // número de acertos sobe

                setTimeout(() => { // animação de igual
                    tagCarta.classList.remove("virarCarta");
                    primeiraCarta.tagCarta.classList.remove("virarCarta");
                }, 500);

                setTimeout(() => {
                    tagCarta.classList.add("virarCarta");
                    primeiraCarta.tagCarta.classList.add("virarCarta");
                    primeiraCarta = null;
                    cliqueHabilitado = true

                    if(tagCarta.classList.contains("susto")) {
                        executaSusto();
                    }

                    if(acertos === JOGO.length/2) { // se ganhou, armazena os dados no localStorage e vai para tela
                        clearInterval(intervalo);   // final
                        localStorage.setItem("minutos", minutos);
                        localStorage.setItem("segundos", segundos);
                        localStorage.setItem("acertos", acertos);
                        localStorage.setItem("erros", erros);
                        window.location.href = "./fim.html";
                    }

                }, 650);
                
            } else {

                setTimeout(() => { // senão volta ao normal
                    tagCarta.classList.remove("virarCarta");
                    primeiraCarta.tagCarta.classList.remove("virarCarta");
                    primeiraCarta = null;
                    cliqueHabilitado = true;
                }, 1000);

                erros++; // número de erros sobe
            }
        }
        outAcertos.textContent = acertos.toString().padStart(2, '0');
        outErros.textContent = erros.toString().padStart(2, '0');
    }
}