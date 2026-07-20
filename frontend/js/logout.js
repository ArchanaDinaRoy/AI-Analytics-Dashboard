const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", (e)=>{

    e.preventDefault();

    const confirmLogout = confirm("Logout from AI Dashboard?");

    if(!confirmLogout){
        return;
    }

    localStorage.removeItem("token");

    alert("Logged out successfully!");

    window.location.href="login.html";

});