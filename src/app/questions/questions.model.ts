export interface Question {
  id?: string | null;
  tipo?: number | null;
  enunciado?: string;
  nivelDificuldade?: number | null;
  tags?: string[];
  areaDeConhecimento?: KnowlegdeArea | null;
  disciplina?: Discipline | null;
  usuario?: string;
  tempoMaximoDeResposta?: number;
}

export interface DiscursiveQuestion extends Question {
  respostaEsperada?: ExpectedAnswer[];
  tempoEsperadoResposta?: number;
}

export interface ObjectiveQuestion extends Question {
  respostaEsperada?: AlternativeAnswer[];
}

export interface TrueOrFalseQuestion extends ObjectiveQuestion {

}

export interface AssociationColumnsQuestion extends Question {
  respostaEsperada?: AssociationColum[];
}

export interface AssociationColum {
  colunaPrincipal: Column;
  colunaAssociada: Column;
}

export interface Column {
  letra?: string;
  descricao: string;
}

export interface AlternativeAnswer {
  descricao?: string;
  correta?: boolean;
}

export interface ExpectedAnswer {
  descricao?: string;
  peso?: number;
}

export interface Discipline {
  codigo?: string;
  descricao?: string;
}

export interface KnowlegdeArea {
  codigo?: string;
  descricao?: string;
}

export const emptyQuestion: DiscursiveQuestion = {
  id: null,
  tipo: 0,
  enunciado: '',
  areaDeConhecimento: {
    codigo: "",
    descricao: ""
  },
  disciplina: {
    codigo: "",
    descricao: ""
  },
  nivelDificuldade: 1,
  tempoMaximoDeResposta: 0,
};

export const emptyQuestionGenerica: Question = {
  id: null,
  tipo: 0,
  enunciado: '',
  areaDeConhecimento: {
    codigo: "",
    descricao: ""
  },
  disciplina: {
    codigo: "",
    descricao: ""
  },
  nivelDificuldade: 1,
  tempoMaximoDeResposta: 0,
};

export interface QuestionFiltersDto {
  tipo: number;
  nivelDificuldadeId: number;
  areaDeConhecimentoId: string;
  disciplinaId: string;
  tempoMaximoDeResposta: number;
  usuario: string;
}
