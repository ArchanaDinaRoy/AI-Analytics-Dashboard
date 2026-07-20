// =========================
// ADD ORDER MODAL
// =========================
let editingOrderId = null;
console.log("addOrder.js loaded");
const modal = document.getElementById("orderModal");
const addOrderBtn = document.getElementById("addOrderBtn");

// Open Modal
addOrderBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Close Modal
function closeModal() {
    modal.style.display = "none";
}

// Close when clicking outside the popup
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// =========================
// SAVE ORDER
// =========================

async function saveOrder() {

    const customerName = document.getElementById("customerName").value.trim();
    const productName = document.getElementById("productName").value.trim();
    const amount = document.getElementById("amount").value;
    const status = document.getElementById("status").value;

    if (!customerName || !productName || !amount) {
        alert("Please fill all fields.");
        return;
    }

    const token = localStorage.getItem("token");

    const url = editingOrderId
        ? `http://localhost:8080/orders/${editingOrderId}`
        : "http://localhost:8080/orders";

    const method = editingOrderId ? "PUT" : "POST";

    const response = await fetch(url, {

        method,

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },

        body: JSON.stringify({
            customerName,
            productName,
            amount: Number(amount),
            status
        })

    });

    if (!response.ok) {
        alert("Operation Failed");
        return;
    }

    alert(editingOrderId ? "Order Updated!" : "Order Added!");

    editingOrderId = null;

    document.getElementById("saveOrderBtn").innerText = "Save Order";

    document.getElementById("customerName").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("status").value = "Completed";

    closeModal();

    loadOrders();
    loadDashboard();
}