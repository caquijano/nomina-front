import jwt from "jsonwebtoken";

function userJson() {
const loggedUserJson = window.localStorage.getItem("loggedUser") || null;

  const user = JSON.parse(loggedUserJson || "");
  let decodeData, arrayUsuario, name: string, char;

  if (user) {
    decodeData = jwt.verify(user, "ikhodi");
    arrayUsuario = Object.values(decodeData);
    name = `${arrayUsuario[1]}`;
    char = name.charAt(0).toUpperCase();
  }
  return arrayUsuario;
}

export default userJson
