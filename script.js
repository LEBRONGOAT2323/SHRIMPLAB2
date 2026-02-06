const projects = [
  { id: "daily", name: "Daily Challenge", path: "projects/daily-challenge/" },
  { id: "tetris", name: "Tetris", path: "projects/tetris/" },
  { id: "mystery", name: "???", path: "#" },
  { id: "lab", name: "The Lab", path: "#" }
];

const container = document.getElementById("projects");

// Save first visit
if (!localStorage.getItem("startDate")) {
  localStorage.setItem("startDate", new Date().toISOString());
}

const startDate = new Date(localStorage.getItem("startDate"));
const today = new Date();

const daysPassed = Math.floor(
  (today - startDate) / (1000 * 60 * 60 * 24)
);

const unlockedCount = Math.min(daysPassed + 1, projects.length);

projects.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "card";

  if (i < unlockedCount) {
    card.textContent = p.name;
    card.onclick = () => location.href = p.path;
  } else {
    card.textContent = `${p.name} 🔒`;
    card.classList.add("locked");
  }

  const messages = [
  "Not yet.",
  "return tomorrow.",
  "You’re early 👀",
  "Patience is game.",
  "Still locked."
];

const msg = messages[Math.floor(Math.random() * messages.length)];
card.textContent = `${p.name} 🔒 — ${msg}`;


  container.appendChild(card);
});

document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "u") {
    localStorage.setItem("startDate", new Date(2000, 0, 1).toISOString());
    location.reload();
  }
});

