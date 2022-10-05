window.addEventListener("DOMContentLoaded", function () {
  const navbarToggle = document.querySelector(".header__menu .navbar-toggle");
  const navbarMenuLinks = document.querySelector(".header__menu .menu__links");

  // navbar events
  navbarToggle.addEventListener("click", () => {
    navbarToggle.classList.toggle("active");
    navbarMenuLinks.classList.toggle("active");
  });
});
