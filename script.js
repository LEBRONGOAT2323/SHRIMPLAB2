// -----------------------
// 1️⃣ SOUNDS
// -----------------------
const sounds = {
  hover: new Audio("assets/sounds/hover.mp3"),
  unlock: new Audio("assets/sounds/unlock.mp3"),
  error: new Audio("assets/sounds/error.mp3")
};

// Optional: slightly lower volume for hover to avoid spamming ears
sounds.hover.volume = 0.3;
sounds.unlock.volume = 0.5;
sounds.error.volume = 0.7;

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

const container = document.getElementById("projects");

// -----------------------
// 3️⃣ FIRST VISIT / UNLOCK LOGIC
// -----------------------
if (!localStorage.getItem("startDate")) {
  localStorage.setItem("startDate", new Date().toISOString());
}

const startDate = new Date(localStorage.getItem("startDate"));
const today = new Date();
const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
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

  // --- UNLOCKED CARDS ---
  if (i < unlockedCount) {
    card.classList.add("unlocked");

    // Build inner HTML with thumbnail
    card.innerHTML = `
      <img src="${p.thumb}" alt="${p.name} thumbnail">
      <span>${p.name}</span>
    `;

    card.onclick = () => location.href = p.path;

    // Hover sound
    card.addEventListener("mouseenter", () => {
      sounds.hover.currentTime = 0;
      sounds.hover.play();
    });

    // Optional: small scale animation on click for polish
    card.addEventListener("mousedown", () => {
      card.style.transform = "scale(0.97)";
    });
    card.addEventListener("mouseup", () => {
      card.style.transform = "scale(1.03)";
    });
    
  
    
  } else {
    // --- LOCKED CARDS ---
    const messages = [
      "Not yet.",
      "Return tomorrow.",
      "You’re early 👀",
      "Patience is part of the game.",
      "Still locked."
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];

    card.innerHTML = `
      <img src="${p.thumb}" alt="Locked">
      <span>${p.name} 🔒 — ${msg}</span>
    `;

    card.classList.add("locked");
  }

  container.appendChild(card);
});

// -----------------------
// 5️⃣ DEV UNLOCK CHEAT
// -----------------------
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "u") {
    localStorage.setItem("startDate", new Date(2000, 0, 1).toISOString());
    location.reload();
  }
});

card.addEventListener("mouseenter", () => {
  if (!card.classList.contains("locked")) {
    for (let i=0;i<5;i++){
      const dot = document.createElement("span");
      dot.className="particle";
      dot.style.left = `${Math.random()*100}%`;
      dot.style.top = `${Math.random()*100}%`;
      card.appendChild(dot);
      setTimeout(()=>dot.remove(),500);
    }
  }
});

