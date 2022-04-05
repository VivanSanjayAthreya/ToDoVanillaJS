const dateTimeList_el = document.querySelector(".date-time");

const date_el = document.createElement("span")
date_el.classList.add("date")
const time_el = document.createElement("span")
time_el.classList.add("time")

let a;
let date;
let time;
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

setInterval(() => {
    a = new Date();
    date = a.toLocaleDateString(undefined, options);
    time = ("0" + a.getHours()).slice(-2) + ':' + ("0" + a.getMinutes()).slice(-2) + ':' + ("0" + a.getSeconds()).slice(-2); ;
    date_el.innerText = date
    time_el.innerText = time
    dateTimeList_el.appendChild(date_el)
    dateTimeList_el.appendChild(time_el)
}, 1000)

