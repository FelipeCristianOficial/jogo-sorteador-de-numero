let listaDeNumerosSorteado = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//Função que altera o HTML
function exibirTextoNaTela (tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial () {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10.');
}

exibirMensagemInicial()



//Função que é acionada ao clicar no botão verificar
function verificarChute() {

    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativas);

        document.querySelector('#reiniciar').removeAttribute('disabled');

    } else{

        if(chute > numeroSecreto){

            exibirTextoNaTela('h1', 'Errou!')
            exibirTextoNaTela('p', 'O numéro secreto é menor.');

        } else if(chute < numeroSecreto){

            exibirTextoNaTela('h1', 'Errou!')
            exibirTextoNaTela('p', 'O número secreto é maior.');

        }
        tentativas++;
        limparCampo();
    }

    console.log(numeroSecreto);
};

//Função que gera um número aleatório
function gerarNumeroAleatorio(){
   
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumeroSorteado = listaDeNumerosSorteado.length;

    if(quantidadeDeNumeroSorteado == numeroLimite){
        listaDeNumerosSorteado = [];
    }
   
    if(listaDeNumerosSorteado.includes(numeroEscolhido)) {
        
        return gerarNumeroAleatorio();
   
    } else{

        listaDeNumerosSorteado.push(numeroEscolhido);
        console.log(listaDeNumerosSorteado)
        return numeroEscolhido;

    }

}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
   numeroSecreto = gerarNumeroAleatorio();
   limparCampo();
   tentativas = 1;
   exibirMensagemInicial();
   document.querySelector('#reiniciar').setAttribute('disabled', true);
}