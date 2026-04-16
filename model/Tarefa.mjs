export class Tarefa {
  constructor(descricao) {
    this.id = crypto.randomUUID();
    this.descricao = descricao;
    this.concluida = false;
  }

  static validar(descricao) {
    const erros = [];
    if (!descricao?.trim()) erros.push('Descrição é obrigatória');
    return erros;
  }
}
