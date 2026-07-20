// Check if user is logged in

const token = localStorage.getItem("token");

if (!token) {

    alert("Please login first!");

    window.location.href = "login.html";

}