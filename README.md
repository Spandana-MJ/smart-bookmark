# Smart Bookmark 🔖

A Smart Bookmark built using Next.js App Router and Supabase Authentication with realtime database.

---

# 🚀 Live Demo

https://smart-bookmark.vercel.app

---

# 🛠️ Tech Stack

* Next.js (App Router)
* Supabase Authentication
* Supabase Database
* Tailwind CSS
* Vercel Deployment

---

# ✨ Features

* Google Authentication
* Add Bookmarks
* Delete Bookmarks
* Realtime Updates
* Secure Logout across Tabs
* Responsive UI

---

# 📁 Project Structure

app/
components/
lib/supabase.js
globals.css

---

# ⚠️ Problems Faced and Solutions

---

## Problem 1: Google login error

Error:

Unsupported provider

Solution:

Enabled Google provider in Supabase Authentication Settings

---

## Problem 2: Logout not working across tabs

Solution:

Used localStorage event listener

window.addEventListener("storage", function(event) {
if(event.key==="logout"){
router.push("/login")
}
})

---

## Problem 3: Realtime update not working

Solution:

Enabled Supabase realtime and used:

supabase
.channel("bookmarks")
.on("postgres_changes", {}, fetchBookmarks)
.subscribe()

---

## Problem 4: Delete bookmark not working

Solution:

Used correct ID:

supabase.from("bookmarks").delete().eq("id", id)

---

## Problem 5: Session not clearing properly

Solution:

Used:

await supabase.auth.signOut()

---

# 📦 Installation

Clone:

git clone https://github.com/Spandana-MJ/smart-bookmark

Install:

npm install

Run:

npm run dev

---

# 🌐 Deployment

Deployed using Vercel

---

# 👩‍💻 Author

Spandana M J

---

# 📚 What I Learned

* Supabase Authentication
* Realtime Database
* Next.js App Router
* Deployment
* State management

---
