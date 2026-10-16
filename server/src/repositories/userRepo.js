import supabase from "../supabaseClient.js";


export async function getAllUsers(){
    const {data, error} = await supabase.from("users").select();
    console.log(data);
    console.log(error);
    return data;
}
