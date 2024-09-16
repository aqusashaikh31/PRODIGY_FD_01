// js/script.js

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const loadProtectedContentButton = document.getElementById("loadProtectedContent");
    const protectedContentDiv = document.getElementById("protectedContent");

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                if (response.ok) {
                    alert("Registration successful!");
                    window.location.href = "login.html";
                } else {
                    const result = await response.json();
                    alert(result.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                if (response.ok) {
                    const result = await response.json();
                    localStorage.setItem("token", result.token);
                    window.location.href = "home.html";
                } else {
                    const result = await response.json();
                    alert(result.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    // Handle Protected Content
    if (loadProtectedContentButton) {
        loadProtectedContentButton.addEventListener("click", async function () {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch('http://localhost:3000/protected', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const result = await response.json();
                    protectedContentDiv.innerHTML = `<p>${result.message}</p>`;
                } else {
                    protectedContentDiv.innerHTML = `<p>You need to <a href="login.html">log in</a> to view this content.</p>`;
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});
