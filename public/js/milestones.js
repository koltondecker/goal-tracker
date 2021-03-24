$(document).ready(() => {

    const newMilestoneQuantityEl = document.getElementById("newMilestoneQuantity");
    const newMilestoneDoneByEl = document.getElementById("newMilestoneDoneBy");
    const newMilestoneSubmitBtn = document.getElementById("newMilestoneSubmitBtn");
    // const addMilestoneBtn = document.querySelector("milestone-button");

    if(newMilestoneSubmitBtn) {
        newMilestoneSubmitBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const goalId = JSON.parse(JSON.stringify(e.target.dataset)).goalid;

            const newMilestoneData = {
                GoalId: parseInt(goalId),
                MilestoneQuantity: newMilestoneQuantityEl.value.trim(),
                MilestoneDoneBy: newMilestoneDoneByEl.value.trim(),
            };

            insertMilestone(newMilestoneData.GoalId, newMilestoneData.MilestoneQuantity, newMilestoneData.MilestoneDoneBy);
            newMilestoneQuantityEl.value = "";
            newMilestoneDoneByEl.value = "";
        });
        
        const insertMilestone = (GoalId, MilestoneQuantity, MilestoneDoneBy) => {
            $.post("/api/new_Milestone", {
                GoalId: GoalId,
                MilestoneQuantity: MilestoneQuantity,
                MilestoneDoneBy: MilestoneDoneBy,
                // GoalId: this.goalQuantity
            })
                .then(() => {
                    console.log("success");
                    location.reload();
                })
                .catch((err) => console.error(err));
        };
    }

    // if(addMilestoneBtn) {
    //     addMilestoneBtn.addEventListener("click", (e) => {
    //         e.preventDefault();


    //     });
    // }

});