export interface Question {
    id?: string | null;
    tipo?: number | null;
    enunciado?: string;
    nivelDificuldade?: number | null;
    tags?: string[];
    areaDeConhecimento?: KnowlegdeArea | null;
    disciplina?: Discipline | null;
    usuario?: string;
}

export interface DiscursiveQuestion extends Question {
    respostaEsperada?: ExpectedAnswer[];
    tempoMaximoDeResposta?: number;
    tempoEsperadoResposta?: number;
}

// tslint:disable-next-line:no-empty-interface
export interface ObjectiveQuestion extends Question {

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
        codigo: '',
        descricao: ''
    },
    disciplina: {
        codigo: '',
        descricao: ''
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
