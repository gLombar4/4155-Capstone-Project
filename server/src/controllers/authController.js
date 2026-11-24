import { signUp, logIn } from "../services/authServices.js";

export async function signUpHandler(req, res) {
  try {
    const username = req.body.user_name;
    const password = req.body.user_password;
    const newUser = await signUp(username, password);
    res.status(201).json({ message: "Account created.", user_id: newUser.user_id });
  } catch (error) {
    console.error("Signup failed:", error);
    let status;
    if (error.status >= 400 && error.status < 500) {
      status = error.status;
    } else {
      status = 500;
    }

    let message;
    if (status === 409) {
      message = error.message;
    } else {
      message = "Unable to create account.";
    }
    res.status(status).json({ error: message });
  }
}

export async function logInHandler(req, res) {
  try {
    const username = req.body.user_name;
    const password = req.body.user_password;
    const accessToken = await logIn(username, password);
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Login failed:", error);
    let status;
    if (error.status >= 400 && error.status < 500) {
      status = error.status;
    } else {
      status = 500;
    }

    let message;
    if (status === 401) {
      message = error.message;
    } else {
      message = "Unable to log in.";
    }
    res.status(status).json({ error: message });
  }
}
