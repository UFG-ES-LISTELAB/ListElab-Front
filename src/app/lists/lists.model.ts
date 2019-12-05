import {Discipline, DiscursiveQuestion, KnowlegdeArea, ObjectiveQuestion} from "../questions/questions.model";

export interface List {
  id: string | null;
  titulo: string;
  areaDeConhecimento: KnowlegdeArea | null;
  nivelDificuldade: number | null;
  disciplina: Discipline | null;
  tags: string[];
  discursivas: DiscursiveQuestion[];
  objetivas: ObjectiveQuestion[];
  usuario: string;
}

export const emptyList: List = {
  id: null,
  titulo: "",
  areaDeConhecimento: null,
  nivelDificuldade: null,
  disciplina: null,
  tags: [],
  discursivas: [],
  objetivas: [],
  usuario: ""
};
