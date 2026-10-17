import * as reviewRepo from "../repositories/reviewRepo.js";

export async function getAllReviews(){
    return await reviewRepo.getAllReviews();
}