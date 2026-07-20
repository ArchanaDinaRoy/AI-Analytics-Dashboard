/* ==========================================
        Sidebar Settings Navigation
========================================== */

const settingsMenu = document.getElementById("settingsMenu");
const settingsSection = document.getElementById("settings");

if (settingsMenu && settingsSection) {

    settingsMenu.addEventListener("click", function (e) {

        e.preventDefault();

        settingsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        document.querySelectorAll(".menu-item").forEach(item => {
            item.classList.remove("active");
        });

        settingsMenu.classList.add("active");

    });

}