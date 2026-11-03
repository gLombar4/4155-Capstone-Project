import * as userRepo from "../repositories/userRepo.js";

export async function getAllUsers() {
  return await userRepo.getAllUsers();
}

export async function getUserById(id) {
  const user = await userRepo.getUserById(id);
  if(user?.length == 0){
    const err = new Error(`Cannot find user with id: ${id}`);
    err.status = 404;
    throw err;
  }
  return user;
}

export async function createUser(data) {
  const { user_name, user_password, role } = data ?? {};
  if (!user_name || !user_password) {
    const err = new Error("Missing fields");
    err.status = 400;
    throw err;
  }

  const existing = await userRepo.getUserByName(user_name);
  if (existing?.length > 0) {
    const err = new Error("User with that name already exists");
    err.status = 409;
    throw err;
  }
  return await userRepo.createUser({ user_name, user_password, role });
}

export async function updateUser(id, data) {
  const user = await userRepo.getUserById(id);
  if (user?.length == 0) {
    const err = new Error(`Cannot find user with id: ${id}`);
    err.status = 404;
    throw err;
  }
  const updated = await userRepo.updateUser(id, data);
  return updated;
}

export async function deleteUser(id) {
  const deleted = await userRepo.deleteUser(id);
  if (deleted?.length == 0) {
    const err = new Error(`Cannot find user with id: ${id}`);
    err.status = 404;
    throw err;
  }
  return {
    message: `User with ID ${id} deleted successfully`,
  };
}