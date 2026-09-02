const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            themeBtn.textContent = "☀️";
        } else {
            themeBtn.textContent = "🌙";
        }
    });
}

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuBtn.textContent = "☰";
        });
    });
}

const typing = document.getElementById("typing");

const words = [
    "Game Developer",
    "AI Developer",
    "Web Developer"
];

let wordIndex = 0;
let letterIndex = 0;

function type() {
    if (!typing) return;

    const word = words[wordIndex];

    typing.textContent = word.substring(0, letterIndex);
    letterIndex++;

    if (letterIndex <= word.length) {
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 1500);
    }
}

function erase() {
    if (!typing) return;

    const word = words[wordIndex];

    typing.textContent = word.substring(0, letterIndex);
    letterIndex--;

    if (letterIndex >= 0) {
        setTimeout(erase, 60);
    } else {
        wordIndex++;

        if (wordIndex >= words.length) {
            wordIndex = 0;
        }

        setTimeout(type, 300);
    }
}

type();

const projects = {
    Muslimna: {
        description:
            "An Islamic digital experience with useful content and interactive features.",
        tech: "HTML • CSS • JavaScript"
    },

    VEXO: {
        description:
            "A modern e-commerce project with products, offers and a clean interface.",
        tech: "HTML • CSS • JavaScript"
    },

    ToDoTask: {
        description:
            "A simple and modern task management application for organizing daily tasks.",
        tech: "HTML • CSS • JavaScript"
    }
};

const modal = document.getElementById("projectModal");

function openProject(projectName) {
    if (!modal || !projects[projectName]) return;

    const project = projects[projectName];

    document.getElementById("modalTitle").textContent = projectName;
    document.getElementById("modalDescription").textContent =
        project.description;
    document.getElementById("modalTech").textContent = project.tech;

    modal.classList.add("active");
}

function closeProject() {
    if (modal) {
        modal.classList.remove("active");
    }
}

if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeProject();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeProject();
    }
});

const langBtn = document.getElementById("langBtn");
const translations = document.querySelectorAll("[data-en]");

let isArabic = false;

function translatePage() {
    translations.forEach((element) => {
        if (isArabic) {
            element.textContent = element.dataset.ar;
        } else {
            element.textContent = element.dataset.en;
        }
    });
}

if (langBtn) {
    langBtn.addEventListener("click", () => {
        isArabic = !isArabic;

        if (isArabic) {
            document.documentElement.dir = "rtl";
            document.documentElement.lang = "ar";
            langBtn.textContent = "EN";
        } else {
            document.documentElement.dir = "ltr";
            document.documentElement.lang = "en";
            langBtn.textContent = "AR";
        }

        translatePage();
    });
}

const canvas = document.getElementById("particles");

if (canvas) {
    const ctx = canvas.getContext("2d");

    let particles = [];

    let mouse = {
        x: null,
        y: null
    };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    window.addEventListener("mousemove", (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5
        });
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {

                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();

                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );

                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );

                    ctx.strokeStyle =
                        "rgba(56, 189, 248, 0.15)";

                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    function drawParticles() {
        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach((particle) => {

            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (
                particle.x < 0 ||
                particle.x > canvas.width
            ) {
                particle.speedX *= -1;
            }

            if (
                particle.y < 0 ||
                particle.y > canvas.height
            ) {
                particle.speedY *= -1;
            }

            if (
                mouse.x !== null &&
                mouse.y !== null
            ) {
                const dx = particle.x - mouse.x;
                const dy = particle.y - mouse.y;

                const distance = Math.sqrt(
                    dx * dx + dy * dy
                );

                if (distance < 120 && distance > 0) {
                    particle.x +=
                        (dx / distance) * 0.5;

                    particle.y +=
                        (dy / distance) * 0.5;
                }
            }

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "#38bdf8";
            ctx.fill();
        });

        connectParticles();

        requestAnimationFrame(drawParticles);
    }

    drawParticles();
}

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -6;

        const rotateY =
            ((x - centerX) / centerX) * 6;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

        card.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        card.style.setProperty(
            "--mouse-y",
            `${y}px`
        );
    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
});

const revealElements =
    document.querySelectorAll(
        ".about, .skills, .projects, .contact"
    );

function revealOnScroll() {

    revealElements.forEach((element) => {

        const elementTop =
            element.getBoundingClientRect().top;

        const windowHeight =
            window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }
    });
}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();