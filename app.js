const participantes = [];

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    if (nome !== "" && !participantes.includes(nome)) {
        participantes.push(nome);
        atualizarListaAmigos();
        input.value = ""; // Limpa o campo de input
    } else {
        alert("Nome já adicionado ou inválido.");
    }
}

function atualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ""; // Limpa a lista antes de atualizá-la

    participantes.forEach((amigo, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = amigo;
        lista.appendChild(listItem);
    });
}

function sortearAmigo() {
    if (participantes.length < 2) {
        alert("É necessário pelo menos dois participantes para sortear.");
        return;
    }

    const resultado = sortearAmigoSecreto([...participantes]);
    exibirResultado(resultado);
}

function sortearAmigoSecreto(participantes) {
    let sorteio = {};
    let nomesDisponiveis = [...participantes];

    for (let participante of participantes) {
        let nomeIndex;

        do {
            nomeIndex = Math.floor(Math.random() * nomesDisponiveis.length);
        } while (nomesDisponiveis[nomeIndex] === participante);

        sorteio[participante] = nomesDisponiveis[nomeIndex];
        nomesDisponiveis.splice(nomeIndex, 1);
    }

    return sorteio;
}

function exibirResultado(resultado) {
    const listaResultado = document.getElementById('resultado');
    listaResultado.innerHTML = ""; // Limpa a lista de resultado

    for (let [amigo, sorteado] of Object.entries(resultado)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${amigo} tirou ${sorteado}`;
        listaResultado.appendChild(listItem);
    }
}
