import { getAuth } from "firebase/auth";
import { setToken } from '../slices/authSlice';
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const refreshTokenIfExpired = async (dispatch) => {
  const currentToken = localStorage.getItem('token');
  const lastRefreshedToken = localStorage.getItem('lastRefreshed');
  const auth = getAuth();
  const currentTime = Date.now();
  

  const userCred = auth.currentUser;
  if (userCred) {
    const tokenExpirationTime = userCred.stsTokenManager.expirationTime;

    if ((tokenExpirationTime - currentTime < 15 * 60 * 1000) || (userCred.stsTokenManager.accessToken !== currentToken)) {
      // Token is about to expire within 15 minutes or doesn't match the current token
      try {
        const refreshedUserCred = await userCred.getIdTokenResult(true);
        const newToken = refreshedUserCred.token;

        localStorage.setItem("token", newToken);
        localStorage.setItem("lastRefreshed", currentTime.toString());
        await dispatch(setToken(newToken));
        
        console.log("Token refreshed successfully");
        return newToken;
      } catch (error) {
        console.error("Error refreshing token:", error);
        toast.error("Something went wrong. Please contact the admin or check your internet connection.");
      }
    }
  }
  return;
};

export default refreshTokenIfExpired;
