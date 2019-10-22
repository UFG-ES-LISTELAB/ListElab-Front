export const ROUTES = {
  questoes: {
    base: 'questoes',
    listar: 'listar',
    criar: 'criar',
    editar: 'editar'
  },
  listas: {
    base: 'listas'
  },
  login: {
    base: 'login'
  },
};

// Questões Module
export const QUESTOES_LISTAR  =   `${ROUTES.questoes.base}/`;
export const QUESTOES_CRIAR   =   `${ROUTES.questoes.base}/${ROUTES.questoes.criar}`;
export const QUESTOES_EDITAR  =   `${ROUTES.questoes.base}/${ROUTES.questoes.editar}`;

// Login Module
export const LOGIN = `${ROUTES.login.base}`;
