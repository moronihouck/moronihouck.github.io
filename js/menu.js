const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelectorAll("nav a");
const nav = document.querySelector("nav");

export function initMenu() {
  // 菜单切换按钮的事件监听
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // 遍历nav中所有的a tag,用forEach来给每个a tag绑定事件监听
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}
