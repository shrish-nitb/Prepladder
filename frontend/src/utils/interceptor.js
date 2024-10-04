import axios from "axios";
import { useSelector } from "react-redux";
import refreshTokenIfExpired from "./refreshTokenIfExpired ";

export const setupInterceptor = (user,dispatch) => {
  axios.interceptors.request.use(async (config) => {
    if (user) {
      let token = await user.getIdToken();
      // console.log(user)
      config.headers.Authorization = `Bearer ${token}`;
    }
    else{
      const refreshToken = await refreshTokenIfExpired(dispatch);
      if(refreshToken) token = refreshToken;
      const token  = localStorage.getItem('token');
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};