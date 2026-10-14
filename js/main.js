import { loadRepos } from "./repo.js";
import { initTheme } from "./theme.js";
import { initMenu } from "./menu.js";
import { initStudyLog } from "./study-log.js";

const contactForm = document.querySelector("#contact form");
const formMessage = document.querySelector(".form-message");

initTheme();
initMenu();
initStudyLog();

// 输入表单的事件监听
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "Thanks! Your message has been sent.";
  // 清空form输入框的内容
  contactForm.reset();
});

loadRepos();
