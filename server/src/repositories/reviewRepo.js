import supabase from "../supabaseClient.js";

export async function getAllReviews() {
  const { data } = await supabase.from("Reviews").select();
  console.log(data);
  // console.log(error);
  return data;
}
