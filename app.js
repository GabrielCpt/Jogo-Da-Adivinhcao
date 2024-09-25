let listaNumeroSorteados = [];
const numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirNaTela(tag, texto) {
    document.querySelector(tag).innerHTML = texto;
}

function mensagemInicial() {
    exibirNaTela('h1', 'Jogo do número secreto');
    exibirNaTela('p', 'Escolha um número entre 1 e 10');
    desabilitarBotaoChutar();
}

function desabilitarBotaoChutar() {
    document.querySelector('#botaoChutar').setAttribute('disabled', true);
}

function habilitarBotaoChutar() {
    document.querySelector('#botaoChutar').removeAttribute('disabled');
}

function verificarChute() {
    const chute = Number(document.querySelector('input').value);
    
    if (chute === numeroSecreto) {
        exibirNaTela('h1', 'Acertou!');
        const mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${tentativas > 1 ? 'tentativas' : 'tentativa'}!`;
        exibirNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirNaTela('p', chute > numeroSecreto ? 'O número secreto é menor' : 'O número secreto é maior');
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido;
    
    do {
        numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
    } while (listaNumeroSorteados.includes(numeroEscolhido));

    listaNumeroSorteados.push(numeroEscolhido);
    if (listaNumeroSorteados.length === numeroLimite) {
        listaNumeroSorteados = [];
    }
    return numeroEscolhido;
}

function limparCampo() {
    document.querySelector('.container__input').value = '';
    verificarInput(); 
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    desabilitarBotaoReiniciar();
}

function desabilitarBotaoReiniciar() {
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function verificarInput() {
    const input = document.querySelector('.container__input').value;
    input === "" ? desabilitarBotaoChutar() : habilitarBotaoChutar();
}

document.querySelector('.container__input').addEventListener('input', verificarInput);
document.querySelector('.container__input').addEventListener('keydown', function (event) {
    if (event.key === "Enter" && !document.querySelector('#botaoChutar').disabled) {
        verificarChute();
    }
});
mensagemInicial();