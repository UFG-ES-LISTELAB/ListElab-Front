export const ROUTES = {
  questoes: {
    base: 'questoes',
    criar: 'criar',
    editar: 'editar'
  },
  listas: {
    base: 'listas',
    criar: 'criar',
    editar: 'editar'
  },
  login: 'login',
  logout: 'logout'
};

// Questões Module
export const QUESTOES_LISTAR  =   `${ROUTES.questoes.base}/`;
export const QUESTOES_CRIAR   =   `${ROUTES.questoes.base}/${ROUTES.questoes.criar}`;
export const QUESTOES_EDITAR  =   `${ROUTES.questoes.base}/${ROUTES.questoes.editar}`;

// Login Module
export const LOGIN = `${ROUTES.login}`;
export const LOGOUT = `${ROUTES.logout}`;

// Listas Listar
export const LISTAS_LISTAR = `${ROUTES.listas.base}/`;
export const LISTAS_CRIAR   =   `${ROUTES.listas.base}/${ROUTES.listas.criar}`;
export const LISTAS_EDITAR  =   `${ROUTES.listas.base}/${ROUTES.listas.editar}`;
