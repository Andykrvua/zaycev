const menu_btn = document.querySelector(".header__menu-btn");
const header_menu = document.querySelector(".header__menu");
const header_logo = document.querySelector(".header__logo a");

let menuOpen = false;

menu_btn.addEventListener("click", () => {
  if (!menuOpen) {
    menu_btn.classList.add("open");
    menu_btn.setAttribute("aria-expanded", "true");
    header_menu.classList.add("open");
    document.body.style.overflow = "hidden";
    // headroom plugin
    headroom.freeze();
    header_logo.focus();
    header_logo.blur();
    menuOpen = true;
  } else {
    menu_btn.classList.remove("open");
    menu_btn.setAttribute("aria-expanded", "false");
    header_menu.classList.remove("open");
    document.body.style.overflow = "visible";
    // headroom plugin
    headroom.unfreeze();
    menuOpen = false;
  }
});
