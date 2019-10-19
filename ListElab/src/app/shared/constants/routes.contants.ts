export const ROUTES = {
  questoes: {
    base: 'questions',
    criar: 'criar',
    editar: 'editar'
  },
  login: {
    base: 'login'
  },
};

// Questões Module
export const QUESTOES_LISTAR = `/${ROUTES.questoes.base}/`;
export const QUESTOES_CRIAR = `/${ROUTES.questoes.base}/${ROUTES.questoes.criar}`;
export const QUESTOES_EDITAR = `/${ROUTES.questoes.base}/${ROUTES.questoes.editar}`;

// Login Module
export const LOGIN = `${ROUTES.login.base}`;
