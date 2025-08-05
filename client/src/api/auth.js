import apiInstance from "./axios";

const registerUser = async (payload) => {
  const res = await apiInstance.post("/auth/register", payload);
  return res;
};

const loginUser = async (payload) => {
  const res = await apiInstance.post("/auth/login", payload);
  return res;
};

const logoutUser = async () => {
  const res = await apiInstance.post("/auth/logout");
  return res;
};

export { registerUser, loginUser, logoutUser };
