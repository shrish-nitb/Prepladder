import { getAuth } from "firebase/auth";
import { setToken } from '../slices/authSlice';


const refreshTokenIfExpired = async (dispatch) => {
  const auth = getAuth();
  const userCred = auth.currentUser;

  if (userCred) {
    const tokenExpirationTime = userCred.stsTokenManager.expirationTime;
    const currentTime = Date.now();
    console.log(userCred.stsTokenManager.expirationTime-currentTime)
    if (tokenExpirationTime - currentTime < 15 * 60 * 1000) { // Check if token is about to expire within 15 minutes
      try {
        const refreshedUserCred = await userCred.getIdTokenResult(true);
        const newToken = refreshedUserCred.token;

        window.localStorage.setItem("token", newToken);
        dispatch(setToken(newToken));
        console.log("Token refreshed successfully");
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }
  }
};

export default refreshTokenIfExpired;
