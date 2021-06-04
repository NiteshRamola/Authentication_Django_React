import jwt from "jsonwebtoken";

function validateUser() {
  let accessToken = localStorage.getItem("access");
  if (accessToken) {
    let isAuthenticated = true;
    accessToken = accessToken.replace('"', "");
    accessToken = accessToken.replace('"', "");
    let decodedToken = jwt.decode(accessToken, { complete: true });
    let dateNow = new Date();
    if (decodedToken.payload.exp * 1000 < dateNow.getTime()) {
      isAuthenticated = false;
      localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
      localStorage.removeItem("userInfo");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    }
    return isAuthenticated;
  } else {
    return false;
  }
}

export default validateUser;
