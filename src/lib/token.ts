const TOKEN_KEY = "access_token";

export const tokenService = {
  set(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  get() {
    return localStorage.getItem(TOKEN_KEY);
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

export default tokenService;
