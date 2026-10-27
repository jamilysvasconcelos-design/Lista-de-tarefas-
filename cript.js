
const inputTarefa = document.getElementById("itemInput");
const btnAdicionar = document.getElementById("addBtn");
const listaItens = document.getElementById("listaItens");

let tarefas = JSON.parse(localStorage.getItem("tarefas_lpaw")) || []
let filtroAtual = "todas";


function salvarLocalStorage() {
  localStorage.setItem("tarefas_lpaw", JSON.stringify(tarefas));
}

/
function renderizarTarefas() {
  listaItens.innerHTML = "";

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtroAtual === "pendentes") return !tarefa.concluida;
    if (filtroAtual === "concluidas") return tarefa.concluida;
    return true; 
  }

  tarefasFiltradas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    if (tarefa.concluida) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-content" onclick="alternarConclusao(${index})">
        <input type="checkbox" ${tarefa.concluida ? "checked" : ""} readonly />
        <span>${tarefa.texto}</span>
      
    listaItens.appendChild(li);
  });
}

// Adiciona uma nova tarefa
function adicionarTarefa() {
  const texto = inputTarefa.value.trim()

  tarefas.push({ texto: texto, concluida: false });
  salvarLocalStorage();
  renderizarTarefas();

  inputTarefa.value = "";
  inputTarefa.focus();
}

// Marca ou desmarca tarefa como concluída
function alternarConclusao(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  salvarLocalStorage();
  renderizarTarefas();
}

// Remove uma tarefa da lista
function removerTarefa(index) {
  tarefas.splice(index, 1);
  salvarLocalStorage();
  renderizarTarefas();
}

// Eventos de clique e teclado
btnAdicionar.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    adicionarTarefa();
  }
});

// Manipulação dos filtros (Todas / Pendentes / Concluídas)
botoesFiltro.forEach((btn) => {
  btn.addEventListener("click", () => {
    botoesFiltro.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");y
    filtroAtual = btn.getAttribute("data-filter");
    renderizarTarefas();
  });
