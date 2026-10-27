import { signUp, logIn } from "../services/authServices.js";

export async function signUpHandler(req, res) {
  console.log(req.body)
  const username = req.body.user_name;
  const password = req.body.user_password;
  const newUser = await signUp(username, password);
  res.status(201).json({ message: `New user created with id: ${newUser.user_id}` });
}

export async function logInHandler(req, res) {
  const username = req.body.user_name;
  const password = req.body.user_password;
  console.log(username);
  const accessToken = await logIn(username, password);
  res.status(200).json({ accessToken });
}
