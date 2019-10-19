export interface Question {
  id?: string;
  tipo?: number;
  enunciado?: string;
  areaDeConhecimento?: number;
  nivelDificuldade?: any;
  respostaEsperada?: PalavraChave[];
  tags?: string[];
  tempoMaximoDeResposta?: number;
  // autor?: any;
  usuario: any;
}

export interface PalavraChave {
  descricao: string;
  peso: number;
}
