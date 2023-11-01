const radios = document.querySelectorAll("input[name='dificuldade']");

radios.forEach(radio => {
    radio.addEventListener("click", function () {
        escolheDificuldade();
    });
});

function escolheDificuldade() {
    const dificuldade = document.querySelector("input[name='dificuldade']:checked").value;

    let tamanho = 0;

    if(dificuldade === "facil") {
        tamanho = 16;
    } else if(dificuldade === "medio") {
        tamanho = 24;
    } else {
        tamanho = 32;
    }

    localStorage.clear();
    localStorage.setItem("tam", tamanho);
}