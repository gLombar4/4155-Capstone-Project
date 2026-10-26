import * as userServices from '../services/userServices.js'

export async function getAllUsersHandler(req, res){
    try{
        const users = await userServices.getAllUsers(req.user);
        res.status(200).json(users);
    }catch(error){
        res.status(error.status || 500).json({"error": "Uh Oh"});
    }
}

export async function getUserByIdHandler(req, res) {
    try {
        const user = await userServices.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.status || 500).json({ "error": "Uh Oh" });
    }
}