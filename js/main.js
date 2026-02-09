function getDefaultLang() {
  const saved = localStorage.getItem("lang");
  if (saved === "en" || saved === "no") return saved;

  const browser = (navigator.language || "en").toLowerCase();
  if (browser.startsWith("no") || browser.startsWith("nb") || browser.startsWith("nn")) return "no";
  return "en";
}

function translatePage(lang) {
  const dict = window.I18N?.[lang];
  if (!dict) return;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const parts = key.split(".");
    let cur = dict;

    for (const p of parts) cur = cur?.[p];
    if (typeof cur === "string") el.textContent = cur;
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  translatePage(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = getDefaultLang();
  translatePage(lang);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });
});
// ================= THEME TOGGLE =================
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");

    themeToggle.textContent = isLight ? "☀️" : "🌙";
  });
}

