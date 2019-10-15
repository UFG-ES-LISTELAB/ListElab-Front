export const ROUTES = {
  questoes: {
    base: 'questions',
    nova: 'new'
  },
  login: {
    base: 'login'
  },
};

// Questões Module
export const QUESTOES_LISTAR = `/${ROUTES.questoes.base}/`;
export const QUESTOES_CRIAR = `/${ROUTES.questoes.base}/${ROUTES.questoes.nova}`;


// Login Module
export const ENTRAR = `${ROUTES.login.base}`;
