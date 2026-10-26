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
    if (error) throw error;
    return data
    
};

export async function getUserByName(name){
    const {data, error} = await supabase
        .from("Users")
        .select("user_name")
        .eq('user_name', name)
    if (error) throw error;
    return data;
}

export async function createUser(user) {
    const newUser = await supabase
        .from("Users")
        .insert({
            "user_name": user.user_name,
            "user_password": user.user_password,
            "role": user.role
        });
    return newUser;
};

export async function updateUser(id, user) { 
    try {
        const updatedUser = await supabase
            .from("Users")
            .update({
                "user_name": user.user_name,
                "user_password": user.user_password
            })
            .eq("user_id", id);
        return updatedUser
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
};

export async function deleteUser(id) {
    const { data, error } = await supabase
        .from("Users")
        .delete()
        .eq("user_id", id)
        .select();

    if (error) throw error;
    return data;
};
