// User Authentication
async function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const userName = document.getElementById('userName').value;
  const phone = document.getElementById('phone').value;

  try {
    const response = await fetch(`${process.env.API_URL}/auth/signup`, {
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
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById('auth-section').style.display = 'none';
      document.getElementById('post-section').style.display = 'block';
      localStorage.setItem('token', data.token);
      fetchPosts();
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert(error.message);
  }
}

// Post Management
async function createPost() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${process.env.API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", 
                "Authorization": `access ${token}` },
      body: JSON.stringify({ title, content })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message || 'Post created successfully!');
    } else {
      alert(data.message || 'Failed to create post.');
    }
    fetchPosts();
  } catch (error) {
    alert(error.message || 'Something went wrong!');
  }
}

async function fetchPosts() {
  const token2 = localStorage.getItem('token');
  const response2 = await fetch(`${process.env.API_URL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `access ${token2}`
    }
  });

  const posts = await response2.json();

  console.log(response2);

  if (response2.ok) {
    console.log(posts);
  } else {
    alert(posts.message || 'Failed to fetch posts.');
  }

  const postList = document.getElementById('posts');
  postList.innerHTML = '';

  posts.data.forEach(post => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${post.title}</strong><p>${post.content}</p>`;
    postList.appendChild(li);
  });
}
