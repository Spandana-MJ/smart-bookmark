
"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";


export default function Dashboard(){

const router=useRouter();

const [user,setUser]=useState(null);

const [bookmarks,setBookmarks]=useState([]);

const [title,setTitle]=useState("");

const [url,setUrl]=useState("");




useEffect(()=>{

let channel;

async function init(){

const { data, error } = await supabase.auth.getUser();

if(error || !data.user){

window.location.href="/";

return;

}

setUser(data.user);


// fetch initial
fetchBookmarks(data.user.id);


// create realtime subscription
channel = supabase

.channel("realtime-bookmarks")

.on(

"postgres_changes",

{

event:"*",

schema:"public",

table:"bookmarks",

filter:`user_id=eq.${data.user.id}`

},

(payload)=>{

console.log("Realtime triggered:", payload);

fetchBookmarks(data.user.id);

}

)

.subscribe((status)=>{

console.log("Realtime status:", status);

});

}

init();


// cleanup
return ()=>{

if(channel){

supabase.removeChannel(channel);

}

};

},[]);


// ✅ ADD THIS HERE
useEffect(() => {

  const { data: listener } = supabase.auth.onAuthStateChange(
    (event, session) => {

      if (!session) {

        router.replace("/");

      }

    }
  );

  return () => {

    listener.subscription.unsubscribe();

  };

}, [router]);






async function getUser(){

const { data, error } = await supabase.auth.getUser();

if(error || !data.user){

window.location.href="/";

return;

}

setUser(data.user);

// pass user id properly
fetchBookmarks(data.user.id);

realtime(data.user.id);

}




async function fetchBookmarks(userId){

const { data, error } = await supabase

.from("bookmarks")

.select("*")

.eq("user_id", userId)

.order("created_at",{ascending:false});

if(error){

console.log(error);

}else{

setBookmarks(data || []);

}

}



async function addBookmark(){

if(!title || !url || !user) return;


// create temp bookmark (instant UI)

const tempBookmark = {

id: Date.now(),

title,

url,

user_id: user.id

};


// show instantly

setBookmarks(prev => [tempBookmark, ...prev]);


// save in database

const { data, error } = await supabase

.from("bookmarks")

.insert({

title,

url,

user_id:user.id

})

.select()

.single();


// replace temp with real data

if(data){

setBookmarks(prev =>

prev.map(b =>

b.id === tempBookmark.id ? data : b

)

);

}

setTitle("");

setUrl("");

}



async function deleteBookmark(id){

// remove instantly

setBookmarks(prev => prev.filter(b => b.id !== id));


// delete in database

const { error } = await supabase

.from("bookmarks")

.delete()

.eq("id", id)

.eq("user_id", user.id);


if(error){

console.log(error);

}
}





async function logout(){

  await supabase.auth.signOut();


  router.replace("/");

}

return(

<div className="min-h-screen bg-gray-200 p-6">


<div className="max-w-xl mx-auto">


{/* HEADER */}

<div className="flex justify-between items-center mb-5">

<div>
<h1 className="text-3xl font-bold text-black">

Bookmarks

</h1>

<p className="text-sm text-gray-500 mt-1">

Logged in as {user?.email}

</p>
</div>
<button

onClick={logout}

className="bg-black text-white px-3 py-1 rounded"

>

Logout

</button>


</div>


{/* FORM */}

<div className="bg-white p-4 rounded shadow mb-4">


<input

placeholder="Title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

className="border border-gray-400 p-2 w-full mb-3 rounded text-black"

/>


<input

placeholder="URL"

value={url}

onChange={(e)=>setUrl(e.target.value)}

className="border border-gray-400 p-2 w-full mb-3 rounded text-black"

/>


<button

onClick={addBookmark}

className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded"

>

Add Bookmark

</button>


</div>


{/* LIST */}

{bookmarks.map((b)=>(

<div

key={b.id}

className="bg-white p-4 rounded shadow mb-3 flex justify-between"

>


<div>

<p className="font-semibold text-black">

{b.title}

</p>


<a

href={b.url}

target="_blank"

className="text-blue-600"

>

{b.url}

</a>


</div>


<button

onClick={()=>deleteBookmark(b.id)}

className="text-red-500"

>

Delete

</button>


</div>

))}


</div>


</div>

);

}



