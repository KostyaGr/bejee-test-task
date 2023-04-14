export const saveLoginDataToStorage = (login, token) => {
  localStorage.setItem("login", login);
  localStorage.setItem("token", token);
};
export const clearLoginDataFromStorage = () => {
  localStorage.removeItem("login");
  localStorage.removeItem("token");
};
export const getLoginDataFromStorage = async () => {
  const login = await localStorage.getItem("login");
  const token = await localStorage.getItem("token");
  return {
    login: login || null,
    token: token || null,
  };
};
