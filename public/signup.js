const API_BASE = "http://172.27.185.122:4000";

(function () {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = '/index.html';
    }
})();

document.getElementById('signup-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const res = await fetch(`${API_BASE}/api/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.error) {
        alert("Signup error: " + data.error);
        return;
      }

      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        email: data.email
      }));

      window.location.href = '/index.html';
    });