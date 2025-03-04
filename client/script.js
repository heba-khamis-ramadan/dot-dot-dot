const API_URL = "http://localhost:5000";

// User Authentication
async function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const userName = document.getElementById('userName').value;
  const phone = document.getElementById('phone').value;

  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, userName, phone })
    });
    alert(response.message);
  } catch (error) {
    alert(error.message);
  }
}

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      document.getElementById('auth-section').style.display = 'none';
      document.getElementById('post-section').style.display = 'block';
      fetchPosts();
    } else {
      alert(response.message);
    }
  } catch (error) {
    alert(error.message);
  }
}

// Post Management
async function createPost() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  try {
    await fetch(`${API_URL}/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });
    alert("Post created!");
    fetchPosts();
  } catch (error) {
    alert("Failed to create post!");
  }
}

async function fetchPosts() {
  const response = await fetch(`${API_URL}/post`);
  const posts = await response.json();

  const postList = document.getElementById('posts');
  postList.innerHTML = '';

  posts.forEach(post => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${post.title}</strong><p>${post.content}</p>`;
    postList.appendChild(li);
  });
}
