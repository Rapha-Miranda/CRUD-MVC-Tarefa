import { TarefaController } from './controller/TarefaController.mjs';

const controller = new TarefaController();
const form = document.getElementById('form-tarefa');
const inputDescricao = document.getElementById('descricao');
const lista = document.getElementById('lista-tarefas');

let editModalInstance = null;
let deleteModalInstance = null;

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

window.alternarStatus = (id) => {
  controller.alternarConclusao(id);
  renderLista();
};

window.editar = (id) => {
  const tarefas = controller.listarTarefas();
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return;

  document.getElementById('edit-tarefa-input').value = tarefa.descricao;
  document.getElementById('edit-tarefa-id').value = id;
  
  if (!editModalInstance) {
      editModalInstance = new bootstrap.Modal(document.getElementById('editModal'));
  }
  editModalInstance.show();
};

document.getElementById('btn-salvar-edicao').addEventListener('click', () => {
    const id = document.getElementById('edit-tarefa-id').value;
    const novaDescricao = document.getElementById('edit-tarefa-input').value;
    
    if (novaDescricao && novaDescricao.trim() !== '') {
        try {
            controller.atualizarTarefa(id, { descricao: novaDescricao.trim() });
            renderLista();
            if (editModalInstance) editModalInstance.hide();
        } catch (err) {
            alert(err.message);
        }
    }
});

window.excluir = (id) => {
  document.getElementById('delete-tarefa-id').value = id;
  if (!deleteModalInstance) {
      deleteModalInstance = new bootstrap.Modal(document.getElementById('deleteModal'));
  }
  deleteModalInstance.show();
};

document.getElementById('btn-confirmar-exclusao').addEventListener('click', () => {
    const id = document.getElementById('delete-tarefa-id').value;
    controller.removerTarefa(id);
    renderLista();
    if (deleteModalInstance) deleteModalInstance.hide();
});

document.addEventListener('DOMContentLoaded', renderLista);
