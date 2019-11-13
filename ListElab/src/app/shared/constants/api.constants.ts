export const API = {
  login: {
    base: 'Usuario',
    login: 'login'
  },
  questoes: {
    base: 'QuestaoDiscursiva',
  },
  listas: {
    base: 'Lista'
  },
  disciplinas: {
    base: 'Disciplina'
  }
};

// ***************
// LOGIN
// ***************
export const API_LOGIN_ENTRAR  =   `${API.login.base}/${API.login.login}`;
