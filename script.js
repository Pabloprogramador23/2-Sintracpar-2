// Carrossel
const carrossel = document.querySelector('.carrossel');
const setaEsquerda = document.querySelector('.seta-esquerda');
const setaDireita = document.querySelector('.seta-direita');

let indiceSlideAtual = 0; 

setaDireita.addEventListener('click', () => { 
    indiceSlideAtual++;
    if (indiceSlideAtual >= carrossel.children.length) { 
        indiceSlideAtual = 0;
    }
    atualizarPosicaoCarrossel(); 
}); 

setaEsquerda.addEventListener('click', () => {
    indiceSlideAtual--;
    if (indiceSlideAtual < 0) {
        indiceSlideAtual = carrossel.children.length - 1;
    }
    atualizarPosicaoCarrossel(); 
}); 

function atualizarPosicaoCarrossel() {
    const larguraSlide = carrossel.children[0].offsetWidth; 
    const deslocamento = -indiceSlideAtual * larguraSlide; 
    carrossel.style.transform = `translateX(${deslocamento}px)`; 
} 