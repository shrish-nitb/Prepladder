import { getAuth,getRedirectResult } from "firebase/auth";

export const handleGoogleRedirect = async(auth,setLoad)=>{
await getRedirectResult(auth)
.then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = result.credential.accessToken;
    // console.log(result)
  }
  // The signed-in user info.
  // const user = result.user;
  // const reserve = {
  //   solves:[],
  //   sessions: [],
  //   user: user,
  // }
  // updateReserve(reserve)
  setLoad(false)

})
.catch(function(error) {
  setLoad(false)
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  console.log(errorCode, errorMessage);
});
}
