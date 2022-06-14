let requisicaoURL = "https://www.luizpicolo.com.br/api.json"
let requisicao = new XMLHttpRequest();
requisicao.open('get', requisicaoURL);
requisicao.responseType = 'json';
requisicao.send();

 class Noticia {
    constructor(author, title, description , url, urlToImage, name, publishedAt, content) {
      this.author = author ;
      this.title = title;
      this.description = description;
      this.url = url;
      this.urlToImage = urlToImage;
      this.name = name;
      this.publishedAt = publishedAt;
      this.content = content ;
    }

    mostrarNoticia() {
      return this.author + "\n" + this.title + "\n" + this.description + "\n" + this.url + "\n" + this.urlToImage + "\n" + this.publishedAt+"\n" + this.content;
    }
  }

  class ErroCustomizado extends Error{
      constructor(author, mensagem){
      super(mensagem);
      this.author = author;
    }

      
  mensagem(){
    return this.author + this.message;
  }
}

  class NoticiaDestaque extends Noticia {
    constructor(author,title, description, url, urlToImage,publishedAt, content) {
      super(author, title, description, url, urlToImage, publishedAt, content )
      this.urlToImage = urlToImage;

    }
  
    noticiar(){
      try {
          return this.mostrarDestaque();
           } catch(erro){
              return erro.mensagem()
 
        }
    }
    mostrarDestaque() {
              if (this.title === undefined  && this.description === undefined ){
      return this.author + "\n" + this.title + "\n" + this.description + "\n" + this.url + "\n\n" + this.urlToImage + "\n" + this.publishedAt + "\n" + this.content ;
            } else {
            throw new ErroCustomizado("Se os campos title e description estiverem vazios, o codigo não será executado."); 
        }
      
      }

  }

  let noticia = new NoticiaDestaque();
   noticia.noticiar()

  requisicao.onload = function() {

   let noticiao = requisicao.response;
   const elemento = document.getElementById('list');

     let titulos = 
     `<div class="btndiv">
      <a class="btnlink" href="https://vitrine.globo.com"/>
      <input class="btn" type="button" value="ASSINE-JÁ" />
      </a>
      
      <a class="btnlink" href="https://g1.globo.com/#">
      <input class="btn" type="button" value="ENTRAR" />
      </a>
      </div>

      <h3 class="nome1">Lucas Pereira Esteves</h3>
      <h3 class="nome2">José Eduardo Cardozo</h3>

      <img class="menug1" src="imagens/menu.png"/>
      <img class="buscag1" src="imagens/buscar.png"/>
      <div class="textao">

      <a class="textaott" href="https://g1.globo.com/#">
      <h1 class="textaott">NOTÍCIAS</h1>
      </a>

      </div>`;
   elemento.insertAdjacentHTML('afterbegin', titulos);

    noticiao.articles.forEach(noticias => {

    let titulo = 
    `<a class="links" href="${noticias.url}"/>
    <h1 class="titulo">${noticias.title}</h1>
    </a>`;
    elemento.insertAdjacentHTML('beforeend', titulo); 

    let descricao = 
    `<div class="descricao">${noticias.description}</div>`;
    elemento.insertAdjacentHTML('beforeend', descricao);
    
    let linkimg = 
    `<img class="imagem" src="${noticias.urlToImage}"alt=""/>`;
    elemento.insertAdjacentHTML('beforeend', linkimg);
      
    let autor = 
    `<div class="autor">
    <p>Publicado por: ${noticias.author}</p>
    </div>`;
    elemento.insertAdjacentHTML('beforeend', autor);
      
    let data = 
      `<div class="datapub">
      <p>Publicado em: ${noticias.publishedAt}</p>
      </div>`;
    elemento.insertAdjacentHTML('beforeend', data);

  });
}