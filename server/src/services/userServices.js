import * as userRepo from "../repositories/userRepo.js";

export async function getAllUsers(){
    return await userRepo.getAllUsers();
}