import { TarefaService } from '../service/TarefaService.mjs';
import { Tarefa } from '../model/Tarefa.mjs';

export class TarefaController {
  constructor() {
    this.service = new TarefaService();
  }

  listarTarefas() {
    return this.service.buscarTodas();
  }

  adicionarTarefa(descricao) {
    const erros = Tarefa.validar(descricao);
    if (erros.length > 0) throw new Error(erros.join(' | '));

    const tarefa = new Tarefa(descricao);
    const tarefas = this.service.buscarTodas();
    tarefas.push(tarefa);
    this.service.salvarTodas(tarefas);

    return tarefa;
  }

  atualizarTarefa(id, novosDados) {
    const tarefas = this.service.buscarTodas();
    const idx = tarefas.findIndex(t => t.id === id);
    if (idx === -1) throw new Error('Tarefa não encontrada');

    tarefas[idx] = { ...tarefas[idx], ...novosDados };
    this.service.salvarTodas(tarefas);
  }

  removerTarefa(id) {
    let tarefas = this.service.buscarTodas();
    tarefas = tarefas.filter(t => t.id !== id);
    this.service.salvarTodas(tarefas);
  }

  alternarConclusao(id) {
    const tarefas = this.service.buscarTodas();
    const idx = tarefas.findIndex(t => t.id === id);
    if (idx !== -1) {
      tarefas[idx].concluida = !tarefas[idx].concluida;
      this.service.salvarTodas(tarefas);
    }
  }
}
