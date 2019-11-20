export const API = {
  login: {
    base: 'Usuario',
    login: 'login'
  },
  questoes: {
    discursiva: 'QuestaoDiscursiva',
    multiplaEscolha: 'QuestaoMultiplaEscolha',
  },
  listas: {
    base: 'Lista'
  },
  disciplinas: {
    base: 'Disciplina'
  },
  areasDeConhecimento: {
    base: 'AreaDeConhecimento'
  }
};

// ***************
// LOGIN
// ***************
export const API_LOGIN_ENTRAR  =   `${API.login.base}/${API.login.login}`;
