export interface Question {
  id?: string | null;
  tipo?: number | null;
  enunciado?: string;
  nivelDificuldade?: number | null;
  tags?: string[];
  areaDeConhecimento?: number | null;
  disciplina?: number | null;
  usuario?: string;
}

export interface DiscursiveQuestion extends Question {
  respostaEsperada?: ExpectedAnswer;
  tempoMaximoDeResposta?: number;
}

export interface ObjectiveQuestion extends Question {

}

export interface ExpectedAnswer {
  palavrasChaves?: Keyword[];
}

export interface Keyword {
  descricao?: string;
  peso?: number;
}

export const emptyQuestion: DiscursiveQuestion = {
  id: null,
  tipo: 0,
  enunciado: '',
  areaDeConhecimento: 0,
  nivelDificuldade: 0,
  tempoMaximoDeResposta: 0,
};
