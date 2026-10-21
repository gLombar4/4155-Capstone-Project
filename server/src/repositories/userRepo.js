import supabase from "../supabaseClient.js";


export async function getAllUsers(){
    const {data} = await supabase.from("Users").select();
    console.log(data);
    // console.log(error);
    return data;
}
