const USERNAME = 'sainipulkit12';
const PASSWORD = 'bangalore';

export const login = (username, password) => {
  if (username === USERNAME && password === PASSWORD) {
    localStorage.setItem('auth', 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('auth');
};

export const isAuthenticated = () => {
  return localStorage.getItem('auth') === 'true';
};
