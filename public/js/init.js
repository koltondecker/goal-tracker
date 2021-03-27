(($) => {
    $(() => {
      $(".sidenav").sidenav();
      $(".collapsible").collapsible();
    }); // end of document ready
  })(jQuery); // end of jQuery name space
  


const btn = document.querySelector(".btn-toggle");
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") {
  document.body.classList.add("light-theme");
}
btn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  let theme = "dark";
  if (document.body.classList.contains("light-theme")) {
    theme = "light";
  }
  localStorage.setItem("theme", theme);
});

