const KEY = 'tarefas';

export class TarefaService {
  buscarTodas() {
    const dados = localStorage.getItem(KEY);
    return dados ? JSON.parse(dados) : [];
  }

  salvarTodas(tarefas) {
    localStorage.setItem(KEY, JSON.stringify(tarefas));
  }
}
