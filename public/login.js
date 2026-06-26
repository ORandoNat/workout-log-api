const loginForm = document.getElementById('login-form');
const API_BASE = "http://172.27.185.122:4000";

(function () {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = '/index.html';
    }
})();

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE}/api/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.error) {
            const errorElement = document.getElementById('login-error');
            const signupBtn = document.getElementById('go-to-signup');

            errorElement.textContent = "Account not found. Would you like to signup?";
            errorElement.style.display = "block";
            signupBtn.style.display = "inline-block";

            signupBtn.addEventListener('click', () => {
                window.location.href = '/signup.html';
            });

            return;
        }

        // Store token and user info in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to main app
        window.location.href = '/index.html';

    } catch (error) {
        console.error(error);
        alert('Login failed');
    }
});