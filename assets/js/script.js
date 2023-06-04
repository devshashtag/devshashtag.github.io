import { headerTemplate } from "/assets/js/modules/template.js";

window.addEventListener("DOMContentLoaded", function () {
  // add header to all pages
  document.body.insertAdjacentHTML("afterbegin", headerTemplate());

  // header events
  const navbarToggle = document.querySelector(".header__menu .navbar-toggle");
  const navbarMenuLinks = document.querySelector(".header__menu .menu__links");

  // navbar events
  navbarToggle.addEventListener("click", () => {
    navbarToggle.classList.toggle("active");
    navbarMenuLinks.classList.toggle("active");
  });
});
