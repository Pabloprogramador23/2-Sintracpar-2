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


function exibirNoticias() { 
    const listaNoticias = document.querySelector('.lista-noticias');
    listaNoticias.innerHTML = ''; // Limpa o conteúdo anterior
  
    // Faz a requisição AJAX para o arquivo noticias.json 
    const xhr = new XMLHttpRequest(); 
    xhr.open('GET', 'noticias.json', true);  // Substitua 'noticias.json' pelo caminho correto, se necessário
  
    xhr.onload = function() { 
        if (this.status === 200) {
          const noticias = JSON.parse(this.responseText);
  
          noticias.forEach(noticia => {
            // Cria os elementos HTML (como no código anterior)
            const divNoticia = document.createElement('div');
            divNoticia.classList.add('noticia');
  
            divNoticia.innerHTML = `
              <img src="${noticia.imagem}" alt="${noticia.titulo}">
              <div class="conteudo">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.resumo}</p>
                <p class="data">${noticia.data}</p>
                <a href="#" class="ler-mais">Ler Mais</a>
              </div>
            `;
  
            listaNoticias.appendChild(divNoticia); 
          }); 
  
        } else {
          console.error("Erro ao carregar noticias.json. Código de status:", this.status); 
          // Adicione uma mensagem amigável para o usuário na página, se desejar
        }
    } 
  
    xhr.onerror = function() { 
        console.error("Erro na requisição AJAX para noticias.json.");
        // Adicione uma mensagem amigável para o usuário na página, se desejar
    };
  
    xhr.send();
  } 
  
  // Chamada da função ao carregar a página (como antes)
  window.addEventListener('load', exibirNoticias); 



























//JSON simulado
/**const noticias = [
    {
      imagem: "assets/imagens/woman-patient-dentist-minPNGG.png", 
      titulo: "Primeira Notícia Incrível", 
      resumo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      data: "15 de Novembro de 2023"  
    }, 
    { 
      imagem: "assets/imagens/trabalhadores.jpeg",
      titulo: "Segunda Notícia Extraordinária", 
      resumo:  "Praesent sed nisi ac mi bibendum laoreet.  ",
      data: "10 de Novembro de 2023"
    }, 
    {
      imagem:  "assets/imagens/advogado.jpeg",
      titulo: "Terceira Notícia Sensacional!",
      resumo:  "Pellentesque habitant morbi tristique senectus et netus", 
      data: "05 de Novembro de 2023" 
    }
    // ... Adicione mais notícias aqui!
  ];

  //função exibir noticias
  function exibirNoticias() {
    const listaNoticias = document.querySelector('.lista-noticias');
    listaNoticias.innerHTML = ''; 
  
    noticias.forEach(noticia => { 
      const divNoticia = document.createElement('div'); 
      divNoticia.classList.add('noticia'); 
  
      divNoticia.innerHTML = `
          <img src="${noticia.imagem}" alt="${noticia.titulo}">
          <div class="conteudo">  
              <h3>${noticia.titulo}</h3> 
              <p>${noticia.resumo}</p>
              <p class="data">${noticia.data}</p>
              <a href="#" class="ler-mais">Ler Mais</a>
          </div>
      `; 
  
      listaNoticias.appendChild(divNoticia); 
    }); 
  }
  //carrega afunção quand a página é carregada
  window.addEventListener('load', exibirNoticias); */