console.log("Orders Started");
let allOrders = [];
let currentPage = 1;
const rowsPerPage = 5;

async function loadOrders() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch("https://ai-analytics-dashboard-production.up.railway.app/orders", {

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const orders = await response.json();

        allOrders = orders;
        console.log("allOrders =", allOrders);

        console.log(orders);

        displayOrders();

    } catch (error) {

        console.log(error);

    }

}

loadOrders();
function displayOrders() {
    console.log("displayOrders() called");
    console.log("Total Orders =", allOrders.length);

    const tbody = document.querySelector("#ordersTable tbody");

    tbody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;

    const end = start + rowsPerPage;

    const pageOrders = allOrders.slice(start, end);

    pageOrders.forEach(order => {
        console.log(order);

        let badge = "";

        if (order.status === "Completed") {

            badge = `<span class="completed">${order.status}</span>`;

        } else if (order.status === "Pending") {

            badge = `<span class="pending">${order.status}</span>`;

        } else {

            badge = `<span class="cancelled">${order.status}</span>`;

        }

        tbody.innerHTML += `
        <tr>
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.productName}</td>
            <td>₹${order.amount}</td>
            <td>${badge}</td>

            <td>

                <button onclick="viewOrder(${order.id})">
                    👁 View
                </button>

                <button onclick="editOrder(${order.id})">
                    ✏️ Edit
                </button>

                <button class="delete-btn"
                        onclick="deleteOrder(${order.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;

    });

    document.getElementById("pageNumber").innerText =
        "Page " + currentPage;

}
function sortOrders() {

    const field = document.getElementById("sortField").value;

    const order = document.getElementById("sortOrder").value;

    if (field === "") {

        displayOrders();

        return;

    }

    allOrders.sort((a, b) => {

        let valueA = a[field];
        let valueB = b[field];

        // String comparison
        if (typeof valueA === "string") {

            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();

        }

        if (valueA < valueB)
            return order === "asc" ? -1 : 1;

        if (valueA > valueB)
            return order === "asc" ? 1 : -1;

        return 0;

    });

    currentPage = 1;

    displayOrders();

}

async function deleteOrder(id) {

    const token = localStorage.getItem("token");

    if (!confirm("Delete this order?")) {
        return;
    }

    const response = await fetch(
        `https://ai-analytics-dashboard-production.up.railway.app/orders/${id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    );

    if (response.ok) {

        alert("Order Deleted");

        loadOrders();
        loadDashboard();

    } else {

        alert("Delete Failed");

    }
}
async function editOrder(id) {

    console.log("Edit clicked", id);

    const token = localStorage.getItem("token");

    try {

        const response = await fetch("https://ai-analytics-dashboard-production.up.railway.app/orders", {

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const orders = await response.json();

        const order = orders.find(o => o.id === id);

        if (!order) {
            alert("Order not found");
            return;
        }

        editingOrderId = id;

        document.getElementById("customerName").value = order.customerName;
        document.getElementById("productName").value = order.productName;
        document.getElementById("amount").value = order.amount;
        document.getElementById("status").value = order.status;

        document.getElementById("saveOrderBtn").innerText = "Update Order";

        document.getElementById("orderModal").style.display = "flex";

    } catch (e) {

        console.error(e);

    }

}

async function viewOrder(id) {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch("https://ai-analytics-dashboard-production.up.railway.app/orders", {

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const orders = await response.json();
        console.log("Orders from API:", orders);

        const order = orders.find(o => o.id === id);

        if (!order) {

            alert("Order not found");

            return;

        }

        document.getElementById("viewId").innerText = order.id;
        document.getElementById("viewCustomer").innerText = order.customerName;
        document.getElementById("viewProduct").innerText = order.productName;
        document.getElementById("viewAmount").innerText = order.amount;
        document.getElementById("viewStatus").innerText = order.status;

        document.getElementById("viewOrderModal").style.display = "flex";

    } catch (error) {

        console.error(error);

        alert("Unable to load order details.");

    }

}
function closeViewModal() {

    document.getElementById("viewOrderModal").style.display = "none";

}
const searchInput = document.getElementById("searchOrder");

searchInput.addEventListener("keyup", function () {
    currentPage = 1;

    const keyword = this.value.toLowerCase();

    const rows = document.querySelectorAll("#ordersTable tbody tr");

    rows.forEach(row => {

        const customer =
            row.children[1].innerText.toLowerCase();

        const product =
            row.children[2].innerText.toLowerCase();

        if (
            customer.includes(keyword) ||
            product.includes(keyword)
        ) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

});
document.getElementById("prevPage").addEventListener("click", () => {

    console.log("Previous Button Clicked");

    if (currentPage > 1) {

        currentPage--;

        console.log("Moving to page", currentPage);

        displayOrders();

    } else {

        console.log("Already on first page");

    }

});

document.getElementById("nextPage").addEventListener("click", () => {

    console.log("Current Page =", currentPage);
    console.log("Rows Per Page =", rowsPerPage);
    console.log("Total Orders =", allOrders.length);

    const totalPages = Math.ceil(allOrders.length / rowsPerPage);

    console.log("Total Pages =", totalPages);

    if (currentPage < totalPages) {

        currentPage++;

        console.log("Moved to Page", currentPage);

        displayOrders();

    } else {

        console.log("Already on last page");

    }

});
document.getElementById("sortField")
    .addEventListener("change", sortOrders);

document.getElementById("sortOrder")
    .addEventListener("change", sortOrders);