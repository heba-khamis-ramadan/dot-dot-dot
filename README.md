# 📝Dot Dot Dot

A simple, clutter-free, text-based social media platform — focused on posts and user interactions, built with Express.js, MongoDB, and a vanilla HTML, CSS, and JavaScript frontend.

---

## 🚀 Tech Stack

**Backend:**  
- Node.js  
- Express.js  
- MongoDB (Atlas)  

**Frontend:**  
- HTML  
- CSS  
- JavaScript  

---

## 🌐 Live Demo

Frontend: [https://dot-dot-dot-two.vercel.app/](https://dot-dot-dot-two.vercel.app/)  
Backend API: [https://dot-dot-dot.onrender.com](https://dot-dot-dot.onrender.com)

---

## 🛠 Features

- **User Authentication**  
  - Sign Up ✨  
  - Log In / Log Out ✅  

- **User Management**  
  - Update Username ✅  
  - Upload Profile Picture ✅  
  - Delete Profile Picture ✅  
  - Get User Profile ✅  
  - Search Users by Email / Username ✅  

- **Post Management**  
  - Create Post ✅  
  - Update Post ✅  
  - Delete Post ✅  
  - Retrieve All Posts ✅  
  - Search Posts by Title / Content ✅  

---

## 📚 API Endpoints

### **Authentication**

- `POST /auth/signup` — Create a new user  
- `POST /auth/login` — Log in user  
- `POST /auth/logout` — Log out user  

### **User Management**

- `PUT /users` — Update user’s username  
- `POST /users/profile-pic` — Upload user profile picture  
- `DELETE /users/profile-pic` — Delete profile picture  
- `GET /users/{user-id}` — Get user profile  
- `GET /users/by-email` — Search user by email  
- `GET /users/by-name` — Search user by username  

### **Post Management**

- `POST /posts` — Create a new post  
- `PUT /posts/{post-id}` — Update a user’s post  
- `DELETE /posts/{post-id}` — Delete a user’s post  
- `GET /posts` — Retrieve all user posts  
- `GET /posts/search-title` — Search post by title  
- `GET /posts/search-content` — Search post by content  

---

## 🎉 Future Improvements

- Enhance UI design with a modern framework like React.js  
- Add comments on posts  
- Implement likes and reactions  

## 💻 Author
#### ✨ Heba Khamis  
[GitHub](https://github.com/heba-khamis-ramadan) | [LinkedIn](https://www.linkedin.com/in/heba-khamis-ramadan/) | [Portfolio](https://github.com/heba-khamis-ramadan)

## 📄 License
This project is licensed under the MIT License.
