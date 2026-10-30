import supabase from "../supabaseClient.js";

export async function getAllReviews() {
  const { data, error } = await supabase.from("Reviews").select();
  //console.log(data);
  if (error) throw error;
  return data;
}


export async function getReview(gameId, userId) {
  const { data, error } = await supabase
    .from("Reviews")
    .select()
    .eq("game_id", gameId)
    .eq("user_id", userId);
  if (error) throw error;
  return data;
}

export async function getReviewsByGame(gameId) {
  const { data, error } = await supabase
    .from("Reviews")
    .select()
    .eq("game_id", gameId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getReviewsByUser(userId) {
  const { data, error } = await supabase
    .from("Reviews")
    .select()
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createReview(review) {
  // created_at omitted so the database defaults to now() for the timestamp, never pass a timestamp for reviews
  const { data, error } = await supabase
    .from("Reviews")
    .insert({
      game_id: review.game_id,
      user_id: review.user_id,
      stars: review.stars,
      written_review: review.written_review,
    })
    .select();
  if (error) throw error;
  return data;
}

export async function updateReview(gameId, userId, { stars, written_review }) {
  const { data, error } = await supabase
    .from("Reviews")
    .update({ stars, written_review })
    .eq("game_id", gameId)
    .eq("user_id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function deleteReview(gameId, userId) {
  const { data, error } = await supabase
    .from("Reviews")
    .delete()
    .eq("game_id", gameId)
    .eq("user_id", userId)
    .select();
  if (error) throw error;
  return data;
}