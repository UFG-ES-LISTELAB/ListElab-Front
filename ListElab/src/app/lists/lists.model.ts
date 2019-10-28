import {DiscursiveQuestion, ObjectiveQuestion } from "../questions/questions.model";

export interface List {
  id: string | null;
  titulo: string;
  areaDeConhecimento: number | null;
  nivelDificuldade: number | null;
  disciplina: number | null;
  tags: string[];
  discursivas: DiscursiveQuestion[];
  objetivas: ObjectiveQuestion[];
}

export const emptyList: List = {
  id: null,
  titulo: "",
  areaDeConhecimento: null,
  nivelDificuldade: null,
  disciplina: null,
  tags: [],
  discursivas: [],
  objetivas: []
};
