$(document).ready(() => {
    const addMilestoneBtn = document.getElementById("addMilestoneBtn");

    function addMilestoneElement() {
        //TODO: Add code here to create a new milestone input line each time the button is pressed to add a milestone!
        console.log("you added a new milestone element to the page!");
    }

    addMilestoneBtn.addEventListener("click", () => {
        addMilestoneElement();
    });
});