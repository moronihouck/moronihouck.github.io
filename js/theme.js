const html = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");

// 改变主题的函数
function applyTheme(theme) {
  if (theme === "dark") {
    html.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    html.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }
}

export function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  // 看有没有已经存入localStorage的主题设置，如果没有的话，再看是不是能匹配上系统的深色模式
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }

  // 主题切换按钮的事件监听
  themeToggle.addEventListener("click", () => {
    let newTheme;
    if (html.classList.contains("dark")) {
      newTheme = "light";
    } else {
      newTheme = "dark";
    }

    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });
}
