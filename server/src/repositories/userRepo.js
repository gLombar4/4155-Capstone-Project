import supabase from "../supabaseClient.js";


export async function getAllUsers(){
    const {data} = await supabase.from("Users").select();
    console.log(data);
    // console.log(error);
    return data;
}

export async function getUserById(id) {
    const { data, error } = await supabase
        .from("Users")
        .select()
        .eq('user_id', id)
    if (error) console.log(error);
    return data
    
};

export async function createUser(user) {
    
};

export async function updateUser(id) { 

};

export async function deleteUser(id) {
    
};
