const firstbtn = document.getElementById("firstbutton");
const weatherbutton = document.getElementById("weatherbtn");
const weatherwidget = document.getElementById("weatherbloc");
const curtain = document.getElementById("curtain");
const leftarrow = document.getElementById("arrow_left");
const warnT = document.getElementById("warn");
const passwordinput = document.getElementById("pass");
const circle = document.getElementById("circle");
const serverwarning = document.getElementById("server-warning");

if (curtain) {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            curtain.classList.replace("curtain_in", "curtain_out");
        });
    });
}
if (passwordinput) {
    passwordinput.addEventListener("keyup", (e) => {
        if (e.key == "Enter") {
            passcheck()
        }
    })
}
if (firstbtn) {
    firstbtn.addEventListener("mousedown", () => {
        passcheck()
});
}
function servercheck() {
    axios.get('http://localhost:3000/')
    .then(response => {
        if (serverwarning) {
            serverwarning.classList.add("hidden");
        }
    })
    .catch(error => {
        if (serverwarning) {
            serverwarning.classList.remove("hidden");
        }
    })
}
servercheck();
setInterval(servercheck, 5000);    
if (leftarrow) {
    leftarrow.addEventListener("mousedown", () => {
        curtain.classList.replace("curtain_out", "curtain_in");
        setTimeout(() => {
            window.location.replace("index.html");
        }, 750);
});
}
if (window.location.pathname.includes("page2.html")) {
    weatherupdate();
    setInterval(weatherupdate, 300000);
} 
function weatherupdate() {
    if (circle) {
        circle.classList.remove("opacity-0");
    }
    axios.get('http://localhost:3000/getweather')
    .then(response => {
        circle.classList.add("opacity-0");
        const json_answer = response.data;
        const countryNcity = json_answer.countrycity;
        const temperature = json_answer.temp;
        const desc = json_answer.description;

        document.getElementById("countryNcity").innerText = countryNcity;
        document.getElementById("temperature").innerText = temperature;
        document.getElementById("description").innerText = desc;
    })
}
function passcheck() {
    const password = passwordinput.value;
    if (password == "") {
        warnT.textContent = "Provide a password";
        warnT.classList.replace("opacity-0", "opacity-100");
        warnT.classList.remove("absolute");
    }
    else {
        axios.post('http://localhost:3000/pass', password, {
        headers: {
            'Content-Type': 'text/plain'
        }
        })
        .then(response => {
            const decision = response.data;
            if (decision == 'yes') {
                curtain.classList.replace("curtain_out", "curtain_in");
                setTimeout(() => {
                    window.location.replace("page2.html");
                }, 750);
            }
            else {
                warnT.textContent = "Password is incorrect";
                warnT.classList.replace("opacity-0", "opacity-100");
                warnT.classList.remove("absolute");
            }
        })
    }
}