import { environment } from "../../../environments/environment";


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
};

// ***************
// LOGIN
// ***************
export const API_LOGIN_ENTRAR  =   `${API.login.base}/${API.login.login}`;
