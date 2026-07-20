/* ==========================================
            DYNAMIC CALENDAR
========================================== */

const monthYear = document.getElementById("monthYear");
const calendarDates = document.getElementById("calendarDates");

const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

function loadCalendar(month, year){

    calendarDates.innerHTML = "";

    monthYear.textContent = `${months[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();

    const totalDays = new Date(year, month + 1, 0).getDate();

    /* Empty Cells */

    for(let i = 0; i < firstDay; i++){

        const empty = document.createElement("div");

        empty.classList.add("empty");

        calendarDates.appendChild(empty);

    }

    /* Dates */

    for(let day = 1; day <= totalDays; day++){

        const date = document.createElement("div");

        date.textContent = day;

        if(
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ){

            date.classList.add("today");

        }

        calendarDates.appendChild(date);

    }

}

/* Previous Month */

prevMonth.addEventListener("click",()=>{

    currentMonth--;

    if(currentMonth < 0){

        currentMonth = 11;

        currentYear--;

    }

    loadCalendar(currentMonth,currentYear);

});

/* Next Month */

nextMonth.addEventListener("click",()=>{

    currentMonth++;

    if(currentMonth > 11){

        currentMonth = 0;

        currentYear++;

    }

    loadCalendar(currentMonth,currentYear);

});

/* First Load */

loadCalendar(currentMonth,currentYear);
/* ==========================================
            TODAY'S SCHEDULE
========================================== */

const scheduleList = document.getElementById("scheduleList");

// const schedules = [

//     {
//         time:"09:00 AM",
//         title:"Team Stand-up Meeting"
//     },

//     {
//         time:"12:30 PM",
//         title:"Code Review"
//     },

//     {
//         time:"03:00 PM",
//         title:"Client Discussion"
//     },

//     {
//         time:"06:00 PM",
//         title:"Project Deployment"
//     }

// ];

async function loadSchedule(){

    const token = localStorage.getItem("token");

    try{

        const response = await fetch(

            "https://ai-analytics-dashboard-production.up.railway.app/dashboard/schedule",

            {

                headers:{

                    "Authorization":"Bearer "+token

                }

            }

        );

        const schedules = await response.json();

        const scheduleList = document.getElementById("scheduleList");

        scheduleList.innerHTML = "";

        schedules.forEach(schedule=>{

            scheduleList.innerHTML += `

                <div class="schedule-item">

                    <span>${schedule.time}</span>

                    <p>${schedule.title}</p>

                </div>

            `;

        });

    }

    catch(error){

        console.error(error);

    }

}

loadSchedule();