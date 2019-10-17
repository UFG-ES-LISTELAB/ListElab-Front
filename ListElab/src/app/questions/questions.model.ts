export interface Question {
  id?: number;
  tipo?: number;
  enunciado?: string;
  areaDeConhecimento?: number;
  nivelDificuldade?: any;
  disciplina?: any;
  respostaEsperada?: PalavraChave[];
  tempoMaximoDeResposta?: number;
  tags?: string[];
  autor?: any;
  usuario: any;
}

export interface PalavraChave {
  descricao: string;
  peso: number;
}
