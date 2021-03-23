$(document).ready(() => {
    // const addMilestoneBtn = document.getElementById("addMilestoneBtn");

    // function addMilestoneElement() {
    //     //TODO: Add code here to create a new milestone input line each time the button is pressed to add a milestone!
    //     console.log("you added a new milestone element to the page!");
    // }

    // addMilestoneBtn.addEventListener("click", () => {
    //     addMilestoneElement();
    // });

    const newMilestoneNameEl = document.getElementById("newMilestoneName");
    const newMilestoneDoneByEl = document.getElementById("newMilestoneDoneBy");
    const newMilestoneSubmitBtn = document.getElementById("newMilestoneSubmitBtn");

    newMilestoneSubmitBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const newMilestoneData = {
            MilestoneName: newMilestoneNameEl.value.trim(),
            MilestoneDoneBy: newMilestoneDoneByEl.value.trim(),
        };

        insertMilestone(newMilestoneData.MilestoneName, newMilestoneData.MilestoneDoneBy);
    });
    
    const insertMilestone = (MilestoneName, MilestoneDoneBy) => {
        $.post("/api/new_Milestone", {
            MilestoneName: MilestoneName,
            MilestoneDoneBy: MilestoneDoneBy,
        })
            .then(console.log("success"))
            .catch((err) => console.error(err));
    };

});