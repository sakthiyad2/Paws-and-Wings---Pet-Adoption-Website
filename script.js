// Run everything after DOM loads
document.addEventListener("DOMContentLoaded", function () {

    // ================= SLIDER =================
    let slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((s, i) => {
            s.classList.remove("active");
            if (i === index) s.classList.add("active");
        });
    }

    function slider() {
        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;
        showSlide(currentSlide);
    }

    if (slides.length > 0) {
        setInterval(slider, 3000);
        showSlide(currentSlide);
    }

    // ================= FILTER =================
    window.filterPets = function(type) {
        let pets = document.querySelectorAll(".card");
        pets.forEach(p => {
            if (type === "all" || p.classList.contains(type)) {
                p.style.display = "block";
            } else {
                p.style.display = "none";
            }
        });
    }

    // ================= SEARCH =================
    window.searchPet = function() {
        let input = document.getElementById("searchPet").value.toLowerCase();
        let cards = document.querySelectorAll(".card");

        cards.forEach(c => {
            let name = c.querySelector("h3").innerText.toLowerCase();
            if (name.includes(input)) {
                c.style.display = "block";
            } else {
                c.style.display = "none";
            }
        });
    }

    // ================= ADOPT BUTTON =================
    let adoptButtons = document.querySelectorAll(".adoptBtn");
    let modal = document.getElementById("modal");
    let petName = document.getElementById("petName");

    adoptButtons.forEach(b => {
        b.onclick = function() {
            if (localStorage.getItem("login") !== "true") {
                alert("Please login first to adopt pets!");
                localStorage.setItem("redirect", "pets.html");
                window.location = "login.html";
            } else {
                let name = b.parentElement.querySelector("h3").innerText;
                if (petName) petName.innerText = "Adoption Form for " + name;
                if (modal) modal.style.display = "block";
            }
        };
    });

    // ================= PET SLIDER =================
    let petIndex = 0;

    window.changePet = function(direction) {
        const cards = document.querySelectorAll(".pet-card");
        if (cards.length === 0) return;

        cards[petIndex].classList.remove("active");
        petIndex += direction;

        if (petIndex >= cards.length) petIndex = 0;
        if (petIndex < 0) petIndex = cards.length - 1;

        cards[petIndex].classList.add("active");

        let indicator = document.getElementById("pet-indicator");
        if (indicator) {
            indicator.innerText = (petIndex + 1) + " / " + cards.length;
        }
    }

    if (document.querySelectorAll(".pet-card").length > 0) {
        setInterval(() => {
            changePet(1);
        }, 5000);
    }

    // ================= COUNTER =================
    function animateCounters() {
        const counters = [
            { id: "petsCount", end: 250 },
            { id: "volCount", end: 40 },
            { id: "donCount", end: 120 }
        ];

        counters.forEach(counter => {
            let obj = document.getElementById(counter.id);
            if (!obj) return;

            let count = 0;
            let interval = setInterval(() => {
                count++;
                obj.innerText = count;
                if (count >= counter.end) {
                    clearInterval(interval);
                }
            }, 20);
        });
    }

    animateCounters();

    // ================= SCROLL BUTTON =================
    let topBtn = document.getElementById("topBtn");

    window.onscroll = function () {
        if (!topBtn) return;

        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    };

    window.topFunction = function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // ================= LOGIN PROTECTION =================
    const isLoggedIn = localStorage.getItem("login") === "true";
    const path = window.location.pathname;

    if (path.includes("donate.html") && !isLoggedIn) {
        alert("Please login to access donation page.");
        localStorage.setItem("redirect", "donate.html");
        window.location = "login.html";
    }

});

// ================= SIGNUP =================
function signup() {
    let u = document.getElementById("newuser").value;
    let p = document.getElementById("newpass").value;

    localStorage.setItem("user", u);
    localStorage.setItem("pass", p);

    alert("Signup successful");
    window.location = "login.html";
}

// ================= LOGIN =================
function login() {
    let u = document.getElementById("user").value;
    let p = document.getElementById("pass").value;

    if (u === localStorage.getItem("user") && p === localStorage.getItem("pass")) {
        localStorage.setItem("login", "true");

        let r = localStorage.getItem("redirect");

        if (r) {
            window.location = r;
            localStorage.removeItem("redirect");
        } else {
            window.location = "index.html";
        }
    } else {
        alert("Invalid login credentials");
    }
}

// ================= CLOSE MODAL =================
function closeForm() {
    let modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
}

// ================= CONTACT =================
function showContactMessage(event) {
    event.preventDefault();
    document.getElementById("contactSuccess").style.display = "block";
    document.querySelector(".contactForm").reset();
}

// ================= ADOPTION FORM =================
function submitAdoption(event) {
    event.preventDefault();
    document.getElementById("successMsg").style.display = "block";
}