export interface Question {
  id?: string;
  tipo?: number;
  enunciado?: string;
  areaDeConhecimento?: number;
  nivelDificuldade?: any;
  disciplina?: number;
  respostaEsperada?: RespostaEsperada;
  tags?: string[];
  tempoMaximoDeResposta?: number;
  // autor?: any;
  usuario?: any;
}

export interface RespostaEsperada {
  palavrasChaves: PalavraChave[];
}

export interface PalavraChave {
  descricao: string;
  peso: number;
}
