// =======================
// PHASE 4 – SHRIMP LAB2
// =======================

// -----------------------
// 1️⃣ SOUNDS
// -----------------------
const sounds = {
  hover: new Audio("assets/sounds/hover.mp3"),
  unlock: new Audio("assets/sounds/unlock.mp3"),
  error: new Audio("assets/sounds/error.mp3")
};

sounds.hover.volume = 0.3;
sounds.unlock.volume = 0.5;
sounds.error.volume = 0.6;

// -----------------------
// 2️⃣ PROJECT DATA
// -----------------------
const projects = [
  {
    id: "daily",
    name: "Daily Challenge",
    path: "projects/daily-challenge/",
    thumb: "projects/daily-challenge/thumb.png"
  },
  {
    id: "tetris",
    name: "Tetris",
    path: "projects/tetris/",
    thumb: "projects/tetris/thumb.png"
  },
  {
    id: "mystery",
    name: "???",
    path: "#",
    thumb: "projects/mystery/thumb.png"
  },
  {
    id: "lab",
    name: "The Lab",
    path: "#",
    thumb: "projects/lab/thumb.png"
  }
];

// 🌙 Night-only secret project
const hour = new Date().getHours();
const nightUnlocked = hour >= 22 || hour < 5;

projects.push({
  id: "afterHours",
  name: "After Hours",
  path: "projects/after-hours/",
  thumb: "projects/after-hours/thumb.png"
});

const container = document.getElementById("projects");

// -----------------------
// 3️⃣ UNLOCK SYSTEM
// -----------------------
if (!localStorage.getItem("startDate")) {
  localStorage.setItem("startDate", new Date().toISOString());
}

const startDate = new Date(localStorage.getItem("startDate"));
const now = new Date();
const daysPassed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
const unlockedCount = Math.min(daysPassed + 1, projects.length);

const lastUnlocked = Number(localStorage.getItem("lastUnlocked")) || 0;
if (unlockedCount > lastUnlocked) {
  sounds.unlock.play();
  localStorage.setItem("lastUnlocked", unlockedCount);
}

// -----------------------
// 4️⃣ RENDER PROJECT CARDS
// -----------------------
projects.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "card";

  // 🌙 Night project lock
  if (p.id === "afterHours" && !nightUnlocked) {
    card.classList.add("locked");
    card.innerHTML = `
      <img src="${p.thumb}" alt="Locked">
      <span>${p.name} 🔒 — Only available at night 🌙</span>
    `;

    card.addEventListener("mouseenter", () => {
      sounds.error.currentTime = 0;
      sounds.error.play();
    });

    container.appendChild(card);
    return;
  }

  // 🔓 UNLOCKED
  if (i < unlockedCount) {
    card.classList.add("unlocked");
    card.innerHTML = `
      <img src="${p.thumb}" alt="${p.name}">
      <span>${p.name}</span>
    `;

    card.onclick = () => location.href = p.path;

    card.addEventListener("mouseenter", () => {
      sounds.hover.currentTime = 0;
      sounds.hover.play();

      // ✨ Particle effect
      for (let j = 0; j < 6; j++) {
        const dot = document.createElement("span");
        dot.className = "particle";
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        card.appendChild(dot);
        setTimeout(() => dot.remove(), 500);
      }
    });

    card.addEventListener("mousedown", () => {
      card.style.transform = "scale(0.96)";
    });

    card.addEventListener("mouseup", () => {
      card.style.transform = "scale(1.05)";
    });

  } else {
    // 🔒 LOCKED
    const messages = [
      "Not yet.",
      "Return tomorrow.",
      "You’re early 👀",
      "Patience is part of the game.",
      "Still locked."
    ];

    const msg = messages[Math.floor(Math.random() * messages.length)];

    card.classList.add("locked");
    card.innerHTML = `
      <img src="${p.thumb}" alt="Locked">
      <span>${p.name} 🔒 — ${msg}</span>
    `;

    card.addEventListener("mouseenter", () => {
      sounds.error.currentTime = 0;
      sounds.error.play();
    });

    card.addEventListener("click", () => {
      card.style.transform = "rotate(1deg) scale(1.02)";
      setTimeout(() => card.style.transform = "", 300);
    });
  }

  container.appendChild(card);
});

// -----------------------
// 5️⃣ DEV MODE
// -----------------------
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "u") {
    localStorage.setItem("startDate", new Date(2000, 0, 1).toISOString());
    location.reload();
  }
});
