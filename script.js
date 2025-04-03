function gerarFrase() {
    let nome = document.getElementById("nome").value;
    let tipo = document.getElementById("tipo").value.toLowerCase();
    let classificacao = document.getElementById("classificacao").value.toLowerCase();
    let descricao = document.getElementById("descricao").value;
    let data = document.getElementById("data").value;
    let local = document.getElementById("local").value;
    
    let dataFormatada = data ? new Date(data).toLocaleString("pt-BR") : "";
    
    let frase = `O beneficiário(a) ${nome} é ${tipo} e ${classificacao} que ${descricao}. O fato ocorreu em ${local} no dia ${dataFormatada}.`;
    
    let resultado = document.getElementById("resultado");
    resultado.textContent = frase;
    resultado.style.background = "#eaf6ff"; 
    resultado.style.color = "#0056b3"; 
    resultado.style.border = "1px solid #007bff";
    
    document.getElementById("copiar").style.display = "block";
    
    adicionarAoHistorico(frase);
    salvarHistorico();
}

function copiarFrase() {
    let frase = document.getElementById("resultado").textContent;
    navigator.clipboard.writeText(frase).then(() => {
        let botao = document.getElementById("copiar");
        botao.textContent = "Copiado!";
        botao.style.background = "#ffc107";
        botao.style.color = "#333";
        setTimeout(() => {
            botao.textContent = "Copiar Frase";
            botao.style.background = "#28a745";
            botao.style.color = "white";
        }, 2000);
    });
}

function adicionarAoHistorico(frase) {
    let historico = document.getElementById("historico");
    let item = document.createElement("li");
    item.textContent = frase;
    historico.insertBefore(item, historico.firstChild);
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("data").value = "";
    document.getElementById("local").value = "";
    
    let resultado = document.getElementById("resultado");
    resultado.textContent = "";
    resultado.style.background = "";
    resultado.style.color = "";
    resultado.style.border = "";
    
    document.getElementById("copiar").style.display = "none";
}

function alternarModo() {
    document.body.classList.toggle("dark-mode");
}

/* Função para salvar o histórico no LocalStorage */
function salvarHistorico() {
    let historico = [];
    document.querySelectorAll("#historico li").forEach(item => {
        historico.push(item.textContent);
    });
    localStorage.setItem("historicoFrases", JSON.stringify(historico));
}

/* Função para carregar o histórico salvo no LocalStorage */
function carregarHistorico() {
    let historico = JSON.parse(localStorage.getItem("historicoFrases")) || [];
    let listaHistorico = document.getElementById("historico");
    
    historico.forEach(frase => {
        let item = document.createElement("li");
        item.textContent = frase;
        listaHistorico.appendChild(item);
    });
}

/* Função para limpar o histórico e remover do LocalStorage */
function limparHistorico() {
    document.getElementById("historico").innerHTML = "";
    localStorage.removeItem("historicoFrases");
}