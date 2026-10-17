import * as reviewServices from '../services/reviewServices.js'

export async function getAllReviewsHandler(req, res){
    try{
        const users = await reviewServices.getAllReviews(req.user);
        res.status(200).json(users);
    }catch(error){
        res.status(error.status || 500).json({"error": "Uh Oh"});
    }
}