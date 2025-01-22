import { api, requestConfig } from "../utils/config.js";

const register = async (data) => {
  try {
    const config = requestConfig("POST", data);
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
};

export default authService;
