export const ROUTES = {
  questoes: {
    base: 'questoes',
    form: 'formulario',
  },
  listas: {
    base: 'listas',
    form: 'formulario'
  },
  login: 'login',
  logout: 'logout'
};

// Questões Module
export const QUESTOES_LISTAR  =   `${ROUTES.questoes.base}/`;
export const QUESTOES_FORMULARIO  =   `${ROUTES.questoes.base}/${ROUTES.questoes.form}`;

// Login Module
export const LOGIN = `${ROUTES.login}`;
export const LOGOUT = `${ROUTES.logout}`;

// Listas Listar
export const LISTAS_LISTAR = `${ROUTES.listas.base}/`;
export const LISTAS_FORMULARIO  =   `${ROUTES.listas.base}/${ROUTES.listas.form}`;
