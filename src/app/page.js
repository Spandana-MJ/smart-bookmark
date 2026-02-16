
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Login(){

const [user,setUser] = useState(null);

useEffect(()=>{

const { data: listener } = supabase.auth.onAuthStateChange(

(event,session)=>{

if(session){

window.location.href="/dashboard";

}else{

setUser(null);

}

}

);

return ()=>{

listener.subscription.unsubscribe();

};

},[]);



async function login(){

await supabase.auth.signInWithOAuth({

provider:"google",

options:{

redirectTo:`${window.location.origin}/dashboard`,

queryParams: {

prompt: "select_account"

}

}

});

}

return(

<div className="flex items-center justify-center min-h-screen bg-gray-100">

<div className="bg-white p-10 rounded shadow text-center">

<h1 className="text-3xl font-bold mb-4">

Smart Bookmark

</h1>

<button

onClick={login}

className="bg-red-500 text-white px-5 py-2 rounded"

>

Login with Google

</button>

</div>

</div>

);

}

