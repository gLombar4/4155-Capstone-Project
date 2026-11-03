import jwt from 'jsonwebtoken';
import * as userRepo from '../repositories/userRepo.js';
import { createUser, getUserByName } from '../repositories/userRepo.js';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export async function signUp(username, password) {
    // const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const existing = await userRepo.getUserByName(username);
          if (existing?.length > 0) {
            const err = new Error("User with that name already exists");
            err.status = 409;
            throw err;
          }
        const newUser = await createUser({ user_name: username, user_password: password, role: "user" });
        console.log(`Signup: ${newUser.user_name}`)
        return newUser;
    } catch (error) {
            if (error.code === 'P2002') {
                const error = new Error('Email has already been used');
                error.status = 409;
                throw error;
            }
            throw error;
        }
    }

export async function logIn(username, password) {
    const user = await getUserByName(username);
    if (user?.length == 0 || user[0].user_password !== password) {
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }

    const accessToken = jwt.sign({id: user.user_id, role: user.role }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN });

    return accessToken;
}