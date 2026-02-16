<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
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
>>>>>>> 6ce742104f5b705bb3e9446a1234f9869802725d
