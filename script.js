const EMAIL = "iheanachodavid@outlook.com";

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("active");
  menuButton.classList.toggle("active");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const navigationLinks = document.querySelectorAll(".nav a:not(.nav-button)");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { threshold: 0.35 }
);

document.querySelectorAll("section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

const cursorLine = document.getElementById("cursorLine");
if (cursorLine) {
  const messages = [
    "buildSomethingGreat();",
    "solveRealProblems();",
    "keepLearning();",
    "createUsefulThings();",
  ];
  let messageIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeMessage() {
    const current = messages[messageIndex];
    characterIndex += deleting ? -1 : 1;
    const visible = current.substring(0, characterIndex);
    cursorLine.innerHTML =
      `<span class="purple">await</span> ${visible}<span class="cursor"></span>`;

    let speed = deleting ? 45 : 80;
    if (!deleting && characterIndex === current.length) {
      speed = 1800;
      deleting = true;
    }
    if (deleting && characterIndex === 0) {
      deleting = false;
      messageIndex = (messageIndex + 1) % messages.length;
      speed = 400;
    }
    setTimeout(typeMessage, speed);
  }

  typeMessage();
}

const heroVisual = document.getElementById("heroVisual");
const terminal = document.getElementById("terminal");

if (heroVisual && terminal) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3;
    terminal.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    terminal.style.transform = "rotate(2deg)";
  });
}

let selectedTopic = "Website";
const topics = document.getElementById("topics");
if (topics) {
  topics.addEventListener("click", (event) => {
    const button = event.target.closest(".topic");
    if (!button) return;
    selectedTopic = button.dataset.topic;
    topics.querySelectorAll(".topic").forEach((el) => {
      el.classList.toggle("active", el === button);
    });
  });
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get("name") || "a visitor";
    const email = data.get("email") || "";
    const message = data.get("message") || "";
    const subject = encodeURIComponent(`${selectedTopic} project from ${name}`);
    const body = encodeURIComponent(`Hi David,\n\n${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    const note = document.getElementById("formNote");
    if (note) note.textContent = "Your email app should open with the message ready.";
  });
}

const copyButton = document.getElementById("copyEmail");
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      copyButton.textContent = "Copied";
      setTimeout(() => {
        copyButton.textContent = "Copy email";
      }, 1800);
    } catch {
      copyButton.textContent = EMAIL;
    }
  });
}

const yearSpan = document.querySelector(".footer-bottom span");
if (yearSpan) {
  yearSpan.textContent = `© ${new Date().getFullYear()} Iheanacho. All rights reserved.`;
}