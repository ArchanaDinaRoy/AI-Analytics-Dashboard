/* Revenue Data */

const revenueData = {

    today: {
        labels: ["9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
        values: [5, 9, 7, 12, 10]
    },

    week: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: [12, 18, 15, 22, 19, 25, 20]
    },

    month: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        values: [12, 19, 15, 25, 22, 35]
    },

    year: {
        labels: [
            "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sep","Oct","Nov","Dec"
        ],
        values: [15,20,18,30,28,40,45,38,50,48,55,60]
    }

};


/* Create Chart */

const ctx = document.getElementById("salesChart");

const salesChart = new Chart(ctx, {

    type: "line",

    data: {

        labels: revenueData.month.labels,

        datasets: [{

            label: "Revenue",

            data: revenueData.month.values,

            borderColor: "#7B61FF",

            backgroundColor: "rgba(123,97,255,.15)",

            fill: true,

            tension: .4

        }]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                display:false

            }

        }

    }

});


/* Filter Buttons */

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const selected = button.textContent.toLowerCase();

        salesChart.data.labels = revenueData[selected].labels;

        salesChart.data.datasets[0].data = revenueData[selected].values;

        salesChart.update();

    });

});
