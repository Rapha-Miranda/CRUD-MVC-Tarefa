import { TarefaController } from './controller/TarefaController.mjs';

const controller = new TarefaController();
const form = document.getElementById('form-tarefa');
const inputDescricao = document.getElementById('descricao');
const lista = document.getElementById('lista-tarefas');

function renderLista() {
  const tarefas = controller.listarTarefas();

  if (tarefas.length === 0) {
    lista.innerHTML = '<li class="list-group-item text-center text-muted">Nenhuma tarefa encontrada.</li>';
    return;
  }

  lista.innerHTML = tarefas.map(t => `
    <li class="list-group-item d-flex justify-content-between align-items-center ${t.concluida ? 'bg-light' : ''}">
      <span class="${t.concluida ? 'text-decoration-line-through text-muted' : ''}">
        ${t.descricao}
      </span>
      <div>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editar('${t.id}')">Alterar</button>
        <button class="btn btn-sm ${t.concluida ? 'btn-warning' : 'btn-success'} me-1" onclick="alternarStatus('${t.id}')">
          ${t.concluida ? 'Desfazer' : 'Concluir'}
        </button>
        <button class="btn btn-sm btn-danger" onclick="excluir('${t.id}')">Excluir</button>
      </div>
    </li>
  `).join('');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    controller.adicionarTarefa(inputDescricao.value);
    inputDescricao.value = '';
    renderLista();
  } catch (err) {
    alert(err.message);
  }
});

// Tornar as funções de ação globais para o onclick no HTML
window.alternarStatus = (id) => {
  controller.alternarConclusao(id);
  renderLista();
};

window.editar = (id) => {
  const tarefas = controller.listarTarefas();
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return;

  const novaDescricao = prompt('Digite o novo nome para a tarefa:', tarefa.descricao);
  if (novaDescricao !== null && novaDescricao.trim() !== '') {
    try {
      controller.atualizarTarefa(id, { descricao: novaDescricao.trim() });
      renderLista();
    } catch (err) {
      alert(err.message);
    }
  }
};

window.excluir = (id) => {
  if (confirm('Deseja realmente excluir esta tarefa?')) {
    controller.removerTarefa(id);
    renderLista();
  }
};

// Render inicial
document.addEventListener('DOMContentLoaded', renderLista);
