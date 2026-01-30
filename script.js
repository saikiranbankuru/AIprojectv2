// =======================
// Sidebar Logic
// =======================
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("sidebarToggle");
const toggleIcon = document.getElementById("toggleIcon");

function setSidebarState(isCollapsed) {
  if (!sidebar) return;
  if (isCollapsed) {
    sidebar.classList.add("collapsed");
    toggleIcon.className = "bi bi-text-indent-right fs-4";
  } else {
    sidebar.classList.remove("collapsed");
    toggleIcon.className = "bi bi-text-indent-left fs-4";
  }
  updateTooltips();
}

toggleBtn?.addEventListener("click", () => {
  setSidebarState(!sidebar.classList.contains("collapsed"));

  const smallLogo = document.getElementById("logo_icon");
  const expandedLogo = document.getElementById("logo_icon_expanded");

  if (smallLogo && expandedLogo) {
    if (sidebar.classList.contains("collapsed")) {
      smallLogo.classList.remove("hidden");
      expandedLogo.classList.add("hidden");
    } else {
      smallLogo.classList.add("hidden");
      expandedLogo.classList.remove("hidden");
    }
  }
});

document.querySelectorAll(".sidebar-item").forEach((item) => {
  item.addEventListener("click", () => {
    if (sidebar?.classList.contains("collapsed")) setSidebarState(false);
  });
});

function updateTooltips() {
  const list = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  list.forEach((el) => {
    if (typeof bootstrap !== "undefined") {
      const inst = bootstrap.Tooltip.getOrCreateInstance(el);
      sidebar.classList.contains("collapsed") ? inst.enable() : inst.disable();
    }
  });
}

// =======================
// Chat Logic
// =======================
const messageList = document.getElementById('message-list');
const scrollBtn = document.getElementById('scroll-to-bottom');

function startChat() {
  const val = document.getElementById("initial-prompt")?.value;
  if (!val?.trim()) return;
  document.getElementById("welcome-view")?.classList.add("hidden");
  messageList?.classList.remove("hidden");
  document.getElementById("sticky-input")?.classList.remove("hidden");
  addMessage(val, "user");
  setTimeout(() => addMessage("I've received your prompt. Let's work on this together!", "ai"), 600);
}

function sendMessage() {
  const input = document.getElementById("followup-prompt");
  if (!input?.value.trim()) return;
  addMessage(input.value, "user");
  input.value = "";
  setTimeout(() => addMessage(
    "Analyzing your request... I'll have an update for you shortly. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "ai"
  ), 800);
}

// =======================
// Scroll Logic
// =======================
function isAtBottom() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight - 20;
}

function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function toggleScrollButton() {
  if (!scrollBtn) return;
  if (isAtBottom()) {
    scrollBtn.classList.add('hidden');
  } else {
    scrollBtn.classList.remove('hidden');
  }
}

if (messageList) {
  const observer = new MutationObserver(() => {
    if (!isAtBottom()) scrollBtn?.classList.remove('hidden');
  });

  observer.observe(messageList, { childList: true, subtree: true });
}

scrollBtn?.addEventListener('click', scrollToBottom);
window.addEventListener('scroll', toggleScrollButton);

// =======================
// Add Message Logic
// =======================
function addMessage(text, sender) {
  if (!messageList) return;

  const msgDiv = document.createElement("div");
  let className = `chat-bubble ${sender === "user" ? "user-msg" : "ai-msg"}`;
  const isLongAiMsg = sender === "ai" && text.length > 120;

  if (isLongAiMsg) className += " ai-msg-long";

  msgDiv.className = className;
  msgDiv.innerText = text;
  messageList.appendChild(msgDiv);

  // After 1 second: remove ai-msg-long + show scroll button
  if (isLongAiMsg) {
    setTimeout(() => {
      msgDiv.classList.remove("ai-msg-long");
      scrollBtn?.classList.remove("hidden");
    }, 1000);
  }

  if (isAtBottom()) {
    scrollToBottom();
  } else {
    scrollBtn?.classList.remove("hidden");
  }
}

// =======================
// Theme Toggle
// =======================
document.getElementById("themeToggle")?.addEventListener("click", () => {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-bs-theme") === "dark";
  html.setAttribute("data-bs-theme", isDark ? "light" : "dark");

  document.getElementById("themeIcon").className = isDark
    ? "bi bi-moon-stars-fill fs-5"
    : "bi bi-sun-fill fs-5";

  const expandedLogo = document.getElementById("logo_icon_expanded");
  const smallLogo = document.getElementById("logo_icon");
  const mainlogo = document.getElementById("logo_image");

  // Switching to LIGHT theme
  if (isDark) {
    if (expandedLogo) expandedLogo.src = "images/AI_logo_1.png";
    if (smallLogo) smallLogo.src = "images/AI_logo_small.png"; // <-- change this image
    if (mainlogo) mainlogo.src = "images/AI_logo_1.png";
  } 
  // Switching to DARK theme
  else {
    if (expandedLogo) expandedLogo.src = "images/AI_logo_2.png";
    if (smallLogo) smallLogo.src = "images/AI_logo_small_white.png"; // <-- dark version
    if (mainlogo) mainlogo.src = "images/AI_logo_2.png";
  }
});


// =======================
// Placeholder Typing Effect
// =======================
const textarea = document.getElementById("initial-prompt");
const baseText = "Ask AI to create a ";
const words = ["dashboard...", "design...", "annual report...", "prototype..."];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  if (!textarea) return;
  const currentWord = words[wordIndex];
  if (!isDeleting) charIndex++; else charIndex--;
  textarea.placeholder = baseText + currentWord.substring(0, charIndex);

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1400;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

if (textarea) {
  typeEffect();
}

// =======================
// Model Selection
// =======================
document.querySelectorAll(".model-opt").forEach((opt) => {
  opt.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("activeModel").innerHTML =
      `<i class="bi bi-stars me-2"></i>${e.target.getAttribute("data-val")}`;
  });
});
