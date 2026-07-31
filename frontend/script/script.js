const firstbtn = document.getElementById("firstbutton");
const weatherbutton = document.getElementById("weatherbtn");
const weatherwidget = document.getElementById("weatherbloc");
const curtain = document.getElementById("curtain");
const leftarrow = document.getElementById("arrow_left");
const warnT = document.getElementById("warn");
const passwordinput = document.getElementById("pass");
const userinput = document.getElementById("user");
const circle = document.getElementById("circle");
const serverwarning = document.getElementById("server-warning");
const stickynotes = document.getElementById("stickynotes");
if (curtain) {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            curtain.classList.replace("curtain_in", "curtain_out");
        });
    });
}
if (passwordinput && userinput) {
    passwordinput.addEventListener("keyup", (e) => {
        if (e.key == "Enter") {
            passcheck()
        }
    })
    userinput.addEventListener("keyup", (e) => {
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
if (window.location.pathname.includes("home.html")) {
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
    const user = userinput.value;
    const info = {
        username: `${user}`,
        password: `${password}`
    };
    if (password == "" || userinput == "") {
        warnT.classList.replace("opacity-0", "opacity-100");
    }
    else {
        axios.post('http://localhost:3000/pass', info, {
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => {
            const decision = response.data;
            if (decision == 'yes') {
                curtain.classList.replace("curtain_out", "curtain_in");
                setTimeout(() => {
                    window.location.replace("home.html");
                }, 750);
            }
            else {
                warnT.classList.replace("opacity-0", "opacity-100");
                passwordinput.value = "";
                userinput.value = "";
            }
        });
    }
}