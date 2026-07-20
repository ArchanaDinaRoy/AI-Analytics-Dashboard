const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const loginButton = document.querySelector(".login-btn");

    loginButton.disabled = true;
    loginButton.innerText = "Logging In...";

    try {

        const response = await fetch("http://localhost:8080/users/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                email: email,
                password: password

            })

        });

        if (response.ok) {

            const data = await response.json();

            // Save JWT
            localStorage.setItem("token", data.token);

            alert("Login Successful!");

            window.location.href = "index.html";

        } else {

            const error = await response.text();

            alert(error);

        }

    } catch (err) {

        console.error(err);

        alert("Cannot connect to Spring Boot Server.");

    }

    loginButton.disabled = false;
    loginButton.innerText = "Login";

});
// Show / Hide Password

const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    } else {

        password.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});