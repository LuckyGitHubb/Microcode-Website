export const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // or sessionStorage
};
