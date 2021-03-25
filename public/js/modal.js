const modal = document.getElementById("goalModal");

// Get the button that opens the modal
const btns = document.querySelectorAll(".add-milestone-button");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
if(btns) {
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      $("#milestoneSubmitBtn").attr("data-goalId", JSON.parse(JSON.stringify(e.target.dataset)).goalid);
      modal.style.display = "block";
    });
  });
} 

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};