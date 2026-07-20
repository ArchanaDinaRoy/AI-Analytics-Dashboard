console.log("Dashboard Started");
let salesChart = null;

async function loadDashboard() {

    const token = localStorage.getItem("token");

    console.log("Token =", token);

    try {

        const response = await fetch("https://ai-analytics-dashboard-production.up.railway.app/dashboard", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        console.log("Status =", response.status);

        if (!response.ok) {
            alert("Unable to load dashboard");
            return;
        }

        const data = await response.json();

        console.log(data);

        const revenue = document.getElementById("revenue");
        const users = document.getElementById("users");
        const orders = document.getElementById("orders");
        const profit = document.getElementById("profit");

        console.log(revenue);
        console.log(users);
        console.log(orders);
        console.log(profit);

        revenue.textContent = data.revenue.toLocaleString();
        users.textContent = data.totalUsers;
        orders.textContent = data.totalOrders;
        profit.textContent = data.profit.toLocaleString();

        console.log("Revenue =", revenue.textContent);
        console.log("Users =", users.textContent);
        console.log("Orders =", orders.textContent);
        console.log("Profit =", profit.textContent);
    } catch (e) {

        console.error(e);

    }

}

async function loadChart() {

    const token = localStorage.getItem("token");

    const response = await fetch("https://ai-analytics-dashboard-production.up.railway.app/orders/chart", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const chartData = await response.json();

    console.log(chartData);

    const labels = chartData.map(item => item.month);
    const values = chartData.map(item => item.revenue);

    const ctx = document.getElementById("salesChart");
    if (salesChart) {
        salesChart.destroy();
    }

    salesChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Revenue",
                data: values,
                borderColor: "#7B61FF",
                backgroundColor: "rgba(123,97,255,0.15)",
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

}

async function loadTeamPerformance() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "https://ai-analytics-dashboard-production.up.railway.app/dashboard/team-performance",
        {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    );

    const data = await response.json();
    console.log(data);

    const teamList = document.getElementById("teamList");

    teamList.innerHTML = "";

    data.forEach(member => {

        teamList.innerHTML += `
            <div class="team-member">

                <span>${member.name}</span>

                <div class="progress">

                    <div class="progress-bar"
                         style="width:${member.performance}%">
                    </div>

                </div>

                <span>${member.performance}%</span>

            </div>
        `;
    });

}
async function loadAIInsights() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(
            "https://ai-analytics-dashboard-production.up.railway.app/dashboard/ai-insights",
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (!response.ok) {
            throw new Error("Unable to load AI Insights");
        }

        const data = await response.json();

        document.getElementById("confidenceValue").textContent =
            data.confidence + "%";

        document.getElementById("accuracyValue").textContent =
            data.accuracy + "%";

        document.getElementById("responseValue").textContent =
            data.responseTime + " sec";

        document.getElementById("confidenceBar").style.width =
            data.confidence + "%";

        document.getElementById("accuracyBar").style.width =
            data.accuracy + "%";

    } catch (error) {

        console.error(error);

    }

}

async function loadRecentActivities() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(
            "https://ai-analytics-dashboard-production.up.railway.app/dashboard/recent-activity",
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (!response.ok) {
            throw new Error("Unable to load Recent Activities");
        }

        const activities = await response.json();

        const activityList = document.getElementById("activityList");

        activityList.innerHTML = "";

        activities.forEach(activity => {

            activityList.innerHTML += `
                <div class="activity-item">

                    <div class="activity-icon">
                        <i class="fa-solid fa-bell"></i>
                    </div>

                    <div class="activity-info">
                        <h4>${activity.title}</h4>
                        <p>${activity.time}</p>
                    </div>

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}
async function loadNotifications() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "https://ai-analytics-dashboard-production.up.railway.app/dashboard/notifications",
        {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    );

    const data = await response.json();

    const container = document.getElementById("notificationList");

    container.innerHTML = "";

    document.getElementById("notificationCount").textContent = data.length;

    data.forEach(notification => {

        container.innerHTML += `
            <div class="notification-item">

                <div class="notification-icon">
                    🔔
                </div>

                <div class="notification-text">

                    <h4>${notification.title}</h4>

                    <p>${notification.time}</p>

                </div>

            </div>
        `;

    });

}
async function loadTasks() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(
            "https://ai-analytics-dashboard-production.up.railway.app/dashboard/tasks",
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const tasks = await response.json();

        const taskList = document.getElementById("taskList");

        taskList.innerHTML = "";

        let completed = 0;

        tasks.forEach(task => {

            if (task.completed) completed++;

            taskList.innerHTML += `
                <label class="task-item">

                    <input type="checkbox"
                           ${task.completed ? "checked" : ""} disabled>

                    <span>${task.task}</span>

                </label>
            `;

        });

        document.getElementById("taskProgress").textContent =
            `${completed} / ${tasks.length}`;

    } catch (error) {

        console.error(error);

    }

}

async function loadNavbarNotifications() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "https://ai-analytics-dashboard-production.up.railway.app/dashboard/notifications",
        {
            headers: {
                Authorization: "Bearer " + token
            }
        }
    );

    const data = await response.json();

    document.getElementById("bellCount").textContent = data.length;

    const dropdown =
        document.getElementById("notificationDropdown");

    dropdown.innerHTML = "";

    data.forEach(n => {

        dropdown.innerHTML += `

        <div class="dropdown-item">

            <i class="fa-solid fa-bell"></i>

            <div>

                <h4>${n.title}</h4>

                <p>${n.time}</p>

            </div>

        </div>

        `;

    });

}
const bellBtn =
    document.getElementById("bellBtn");

const dropdown =
    document.getElementById("notificationDropdown");

bellBtn.onclick = () => {

    dropdown.classList.toggle("show");

}

document.addEventListener("click", e => {

    if (!bellBtn.contains(e.target)
        && !dropdown.contains(e.target)) {

        dropdown.classList.remove("show");

    }

});
async function loadNavbarMessages() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(
            "https://ai-analytics-dashboard-production.up.railway.app/dashboard/messages",
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const messages = await response.json();

        document.getElementById("messageCount").textContent =
            messages.length;

        const dropdown =
            document.getElementById("messageDropdown");

        dropdown.innerHTML = "";

        messages.forEach(msg => {

            dropdown.innerHTML += `
                <div class="dropdown-item">

                    <i class="fa-solid fa-envelope"></i>

                    <div>

                        <h4>${msg.sender}</h4>

                        <p>${msg.message}</p>

                        <small>${msg.time}</small>

                    </div>

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}
document
    .getElementById("messageBtn")
    .addEventListener("click", () => {

        document
            .getElementById("messageDropdown")
            .classList.toggle("show");

    });
const navbarSearch = document.getElementById("searchInput");

if (navbarSearch) {

    navbarSearch.addEventListener("keyup", async () => {

        const keyword = navbarSearch.value.trim();

        const resultsBox = document.getElementById("searchResults");

        if (keyword === "") {

            resultsBox.style.display = "none";
            resultsBox.innerHTML = "";
            return;

        }

        const token = localStorage.getItem("token");

        const response = await fetch(
            "https://ai-analytics-dashboard-production.up.railway.app/dashboard/search?keyword=" + keyword,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const results = await response.json();

        resultsBox.innerHTML = "";

        results.forEach(item => {

            resultsBox.innerHTML += `
                <div class="search-item">
                    <h4>${item.title}</h4>
                    <p>${item.subtitle}</p>
                </div>
            `;

        });

        resultsBox.style.display = "block";

    });

}

document.addEventListener("click", (e) => {

    if (!document.querySelector(".search-box").contains(e.target)) {

        document.getElementById("searchResults").style.display = "none";

    }

});


loadDashboard();
loadChart();
loadTeamPerformance();
loadAIInsights();
loadRecentActivities();
loadNotifications();
loadTasks();
loadNavbarNotifications();
loadNavbarMessages();

