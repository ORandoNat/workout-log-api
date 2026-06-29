const API_BASE = "https://workout-log-tfw8.onrender.com";

async function apiFetch(path, options = {}) {
    return fetch(`${API_BASE}${path}`, options);
}

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

      const res = await apiFetch('/api/user/signup', {
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