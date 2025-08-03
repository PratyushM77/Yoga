# 🧘 Yoga Path

A full-stack web app to create, browse & manage yoga sessions.

---

## 🚀 Features

- 🔐 JWT-based login & logout
- 📚 Browse yoga poses by level (beginner/intermediate/expert)
- 📝 Create new sessions with title, tags, description & image
- 💾 Save sessions as **drafts** or **publish** them
- ✏️ Edit or delete draft sessions
- ⚡ Smooth transitions (Framer Motion)
- 🍃 Clean UI (Tailwind CSS)

---

## 🛠 Tech Stack

**Frontend:** React, Tailwind CSS, Framer Motion  
**Backend:** Node.js, Express.js, MongoDB, JWT   

---
##  Folder Structure
```
Yoga/
├── backend/              
│   ├── Auth/              
│   ├── Models/            
│   ├── Routes/           
│   ├── server.js          
│   └── db.js      
│
├── frontend/            
│   ├── assets/           
│   ├── components/        
│   │   └── Draft.jsx     
│   │   └── Mysessions.jsx 
│   │   └── YogaCard.jsx  
│   ├── App.jsx           
│   └── package.json      
│
├── .gitignore             
└── README.md              
```

## 📦 Local Setup

Allow access to third part cookies in browser 🍪
```bash
git clone https://github.com/PratyushM77/Yoga.git

open two different terminals 

# Backend

cd backend
npm install
node server.js
MONGO_URI=your_mongodb_connection_string 

# Frontend

cd frontend
npm install
npm run dev

```
## 🙋‍♂️ Author

Made with ❤️ by **Pratyush Mishra**

* GitHub: [@PratyushM77](https://github.com/PratyushM77)

---

