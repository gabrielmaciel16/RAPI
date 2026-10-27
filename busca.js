// ===== Índice de páginas para a busca do site RAPI =====
// Para incluir uma página nova na busca, basta adicionar um item aqui.
const RAPI_PAGINAS = [
    { titulo: "Início",                    url: "pagina01.html", palavras: ["início", "inicio", "racismo", "o que é", "contexto histórico"] },
    { titulo: "Quem Somos",                url: "pagina02.html", palavras: ["quem somos", "contextualização", "projeto", "rapi"] },
    { titulo: "Objetivos",                 url: "pagina03.html", palavras: ["objetivos", "meta", "propósito"] },
    { titulo: "Formações Antirracistas",   url: "pagina04.html", palavras: ["formações", "atividades", "cursos", "livros", "vídeos", "videos"] },
    { titulo: "Referências",               url: "pagina05.html", palavras: ["referências", "referencias", "bibliografia", "fontes"] },
    { titulo: "Valorização da Cultura",    url: "pagina06.html", palavras: ["cultura", "áfrica", "africana", "religião", "tradição oral"] },
];

function buscaNormalizar(texto){
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function buscaExpandir(){
    const form = document.getElementById("busca-form");
    const input = document.getElementById("busca-input");
    form.classList.add("expandido");
    document.getElementById("busca-btn").style.display = "none";
    setTimeout(() => input.focus(), 150);
}

function buscaFechar(){
    const form = document.getElementById("busca-form");
    const input = document.getElementById("busca-input");
    const sugestoes = document.getElementById("busca-sugestoes");
    form.classList.remove("expandido");
    document.getElementById("busca-btn").style.display = "flex";
    input.value = "";
    sugestoes.classList.remove("ativo");
}

function buscaAtualizarSugestoes(){
    const termo = buscaNormalizar(document.getElementById("busca-input").value.trim());
    const sugestoes = document.getElementById("busca-sugestoes");

    if(!termo){
        sugestoes.classList.remove("ativo");
        sugestoes.innerHTML = "";
        return;
    }

    const resultados = RAPI_PAGINAS.filter(pagina =>
        pagina.palavras.some(palavra => buscaNormalizar(palavra).includes(termo))
        || buscaNormalizar(pagina.titulo).includes(termo)
    );

    if(resultados.length === 0){
        sugestoes.innerHTML = '<div class="busca-vazio">Nenhum resultado encontrado</div>';
    } else {
        sugestoes.innerHTML = resultados
            .map(p => `<a href="${p.url}">${p.titulo}</a>`)
            .join("");
    }
    sugestoes.classList.add("ativo");
}

function buscaSubmeter(evento){
    evento.preventDefault();
    const termo = buscaNormalizar(document.getElementById("busca-input").value.trim());
    if(!termo) return;

    const resultado = RAPI_PAGINAS.find(pagina =>
        pagina.palavras.some(palavra => buscaNormalizar(palavra).includes(termo))
        || buscaNormalizar(pagina.titulo).includes(termo)
    );

    if(resultado){
        window.location.href = resultado.url;
    }
}

document.addEventListener("click", function(evento){
    const container = document.querySelector(".busca-container");
    if(container && !container.contains(evento.target)){
        buscaFechar();
    }
});
