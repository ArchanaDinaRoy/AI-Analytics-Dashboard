const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const signupButton = document.querySelector(".signup-btn");
    signupButton.disabled = true;
    signupButton.innerText = "Creating Account...";

    try {

        const response = await fetch("https://ai-analytics-dashboard-production.up.railway.app/users", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                fullName: fullName,
                email: email,
                password: password

            })

        });

        if (response.ok) {

            alert("Account Created Successfully!");

            window.location.href = "login.html";

        } else {

            const error = await response.text();

            alert("Signup Failed\n\n" + error);

        }

    } catch (err) {

        console.error(err);

        alert("Cannot connect to Spring Boot Server.");

    }

    signupButton.disabled = false;
    signupButton.innerText = "Create Account";

});