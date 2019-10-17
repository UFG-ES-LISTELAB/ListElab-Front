export interface Question {
  id?: number;
  tipo?: number;
  enunciado?: string;
  areaConhecimento?: number;
  nivelDificuldade?: any;
  disciplina?: any;
  autor?: any;
  respostaEsperada?: PalavraChave[];
  tempoMaximoDeResposta?: number;
  tags?: string[];
}

export interface PalavraChave {
  descricao: string;
  peso: number;
}
