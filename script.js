window.addEventListener('load', exibirNoticias); 

// Carrossel  
const carrossel = document.querySelector('.carrossel');  
const setaEsquerda = document.querySelector('.seta-esquerda');  
const setaDireita = document.querySelector('.seta-direita');

 let indiceSlideAtual = 0;

 setaDireita.addEventListener('click',  () => { 
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
  carrossel.style.transform =  `translateX(${deslocamento}px)`; 
} 

// Função para carregar e exibir as notícias (AJAX) -  com Paginação 
 function exibirNoticias(pagina =  1) { 
   const noticiasPorPagina =  6;  //  Número de notícias por página  -  ajuste conforme necessário
   
   const listaNoticias = document.querySelector('.lista-noticias');  
   listaNoticias.innerHTML =  ''; //  Limpa o conteúdo anterior 

    const xhr = new XMLHttpRequest(); 
   xhr.open('GET',  'noticias.json',  true);
    
    xhr.onload =  function () { 
        if  (this.status ===  200)  {
             const todasNoticias = JSON.parse(this.responseText);

          //  ===== Paginação ===== // 
            const totalPaginas = Math.ceil(todasNoticias.length  / noticiasPorPagina); 
            criarBotoesPaginacao(totalPaginas); 

           //  Calcula o índice inicial e final das notícias a serem exibidas
          const indiceInicial = (pagina -  1)  *  noticiasPorPagina;
          const indiceFinal = indiceInicial +  noticiasPorPagina;
          const noticiasPagina = todasNoticias.slice(indiceInicial,  indiceFinal);

        //  Cria os cards das notícias 
        noticiasPagina.forEach(noticia  =>  { 
             const divNoticia = document.createElement('div');
             divNoticia.classList.add('noticia');  

           divNoticia.innerHTML = ` 
               <img src="${noticia.imagem}"  alt="${noticia.titulo}">
               <div class="conteudo">
                <h3>${noticia.titulo}</h3> 
                <p>${noticia.resumo}</p>  
                <p class="data">${noticia.data}</p>
                <a href="#" class="ler-mais">Ler Mais</a>  
               </div> 
           `; 

             listaNoticias.appendChild(divNoticia); 
        });
         
    }  else { 
         console.error('Erro ao carregar noticias.json. Código de status:',  this.status);  
       } 
  };
   
  xhr.onerror =  function  () {
   console.error('Erro na requisição AJAX para noticias.json.');  
 };  

 xhr.send();  
}


// ===== Função para criar os botões de paginação ===== // 
 function criarBotoesPaginacao(totalPaginas)  {
 const paginacao = document.querySelector('.paginacao');
 paginacao.innerHTML = ''; // Limpa os botões anteriores

   for  (let i = 1;  i  <=  totalPaginas;  i++)  { 
    const botao = document.createElement('button');  
    botao.classList.add('btn-pagina');  
   botao.textContent = i;  
    botao.dataset.pagina = i; // Armazena o número da página no atributo data-pagina

     botao.addEventListener('click',  () =>  { 
      exibirNoticias(i); // Carrega as notícias da página clicada 
   });
  
    paginacao.appendChild(botao);  
 }  
 }

 // Carrega as notícias da primeira página ao carregar a página 
 window.addEventListener('load',  () => exibirNoticias(1));

 //  Função para lidar com o envio do formulário de contato  
 function enviarFormulario(event)  {  
  event.preventDefault(); // Impede o comportamento padrão do formulário  (recarregar a página) 

  // 1. Coletar os dados do formulário  
   const nome = document.getElementById('nome').value;
   const email = document.getElementById('email').value;
   const mensagem = document.getElementById('mensagem').value;  

  console.log("Nome:",  nome);
   console.log("Email:", email);  
  console.log("Mensagem:",  mensagem); 

  // 2. Enviar os dados para o servidor  (backend) -  Faremos isso mais tarde
  //  ... (código AJAX para enviar os dados, quando o backend estiver pronto) 

  // 3.  Exibir uma mensagem para o usuário  (por enquanto, apenas no console) 
   console.log("Formulário Enviado com Sucesso!"); 
  alert("Obrigado pelo contato, entraremos em contato em breve");

   //  4.  Limpar os campos do formulário  (opcional) 
   document.getElementById('contatoForm').reset(); 
}
 
 // Adiciona um evento de "submit" ao formulário  
 const formulario = document.getElementById('contatoForm'); 
formulario.addEventListener('submit',  enviarFormulario);

//  Menu Hambúrguer
const btnHamburguer = document.querySelector('.btn-hamburguer');  
 const menu = document.querySelector('nav ul');  //  Seleciona diretamente a  ul  do menu  

 btnHamburguer.addEventListener('click',  () =>  {
 menu.classList.toggle('aberto');  // Alterna a classe  "aberto" na  ul  do menu 
});
// Função para lidar com o envio da denúncia
function enviarDenuncia(event) {
  event.preventDefault();

  // Coletar os dados da denúncia
  const tipoDenuncia = document.getElementById('tipoDenuncia').value;
  const descricao = document.getElementById('descricao').value;
  const nomeDenunciante = document.getElementById('nomeDenunciante').value;
  const emailDenunciante = document.getElementById('emailDenunciante').value;

  console.log("Tipo de Denúncia:", tipoDenuncia);
  console.log("Descrição:", descricao);
  console.log("Nome do Denunciante:", nomeDenunciante);
  console.log("Email do Denunciante:", emailDenunciante);

  //  Enviar os dados para o servidor (backend) -  Usando AJAX! 
  const xhr = new XMLHttpRequest(); 
  xhr.open('POST', 'http://localhost:8080/api/denuncias', true); //  Substitua pela URL real do seu endpoint

  xhr.setRequestHeader('Content-Type', 'application/json'); 

  xhr.onload = function () {
    if (this.status >= 200 && this.status < 300) {
        //  Sucesso ao enviar a denúncia
        console.log("Denúncia enviada com sucesso!");
        alert("Sua denúncia foi enviada com sucesso. Agradecemos o seu contato!");
        document.getElementById('denunciaForm').reset(); 
    } else {
        //  Erro ao enviar a denúncia 
        console.error("Erro ao enviar denúncia. Código de status:", this.status);
        alert("Ocorreu um erro ao enviar a denúncia. Por favor, tente novamente mais tarde."); 
    }
  };

  xhr.onerror = function () {
    console.error("Erro na requisição AJAX para enviar denúncia.");
    alert("Ocorreu um erro ao enviar a denúncia. Por favor, tente novamente mais tarde."); 
  };

  const data = JSON.stringify({
      tipo: tipoDenuncia,
      descricao: descricao,
      nome: nomeDenunciante,
      email: emailDenunciante 
  });
  xhr.send(data);  
}
