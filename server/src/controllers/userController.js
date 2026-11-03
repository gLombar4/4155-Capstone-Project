import * as userServices from "../services/userServices.js";

export async function getAllUsersHandler(req, res) {
  try {
    const users = await userServices.getAllUsers(req.user);
    res.status(200).json(users);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export async function getUserByIdHandler(req, res) {
  try {
    const user = await userServices.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message});
  }
}

export async function createUserHandler(req, res) {
  try {
    const newUser = await userServices.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export async function updateUserHandler(req, res) {
  try {
    const updatedUser = await userServices.updateUser(
      Number(req.params.id),
      req.body,
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export async function deleteUserHandler(req, res) {
  try {
    const result = await userServices.deleteUser(Number(req.params.id));

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}