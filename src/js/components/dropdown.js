// language dropdown
const dropdown_menu = document.querySelector(".dropdown-menu");
const language_btn = document.querySelector("#dropdown_language_menu_button");
const active_item = document.querySelector(".dropdown-item.active");
const dropdown_icon = document.querySelector(".dropdown .svg__dropdown");

document.addEventListener("click", show_hide);
document.addEventListener("keydown", key_show_hide_focus);

function show_hide(e) {
  if (dropdown_menu.classList.contains("show")) {
    dropdown_menu.classList.toggle("show");
    dropdown_icon.classList.toggle("show");
    language_btn.setAttribute("aria-expanded", "false");
  } else {
    if (e.target.closest("#dropdown_language_menu_button") === language_btn) {
      active_item.setAttribute("tabindex", "-1");
      dropdown_menu.classList.toggle("show");
      dropdown_icon.classList.toggle("show");
      language_btn.setAttribute("aria-expanded", "true");
    }
  }
}

function key_show_hide_focus(e) {
  if (dropdown_menu.classList.contains("show")) {
    if (e.key === "Escape") {
      dropdown_menu.classList.toggle("show");
      dropdown_icon.classList.toggle("show");
      language_btn.setAttribute("aria-expanded", "false");
    }
  }
}

// sz dropdown
const sz_dropdown = document.querySelector(".sz");
const pulse_btn = document.querySelector(".sz__btn");

if (sz_dropdown) {
  document.addEventListener("click", show_hide2);
  document.addEventListener("keydown", key_show_hide_focus2);
}

function show_hide2(e) {
  if (sz_dropdown.classList.contains("show")) {
    sz_dropdown.classList.toggle("show");
    pulse_btn.setAttribute("aria-expanded", "false");
  } else {
    if (e.target === pulse_btn) {
      sz_dropdown.classList.toggle("show");
      pulse_btn.setAttribute("aria-expanded", "true");
    }
  }
}

function key_show_hide_focus2(e) {
  if (sz_dropdown.classList.contains("show")) {
    if (e.key === "Escape") {
      sz_dropdown.classList.toggle("show");
      pulse_btn.setAttribute("aria-expanded", "false");
    }
  }
}
