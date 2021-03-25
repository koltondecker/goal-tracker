$(document).ready(() => {

    const newMilestoneQuantityEl = document.getElementById("newMilestoneQuantity");
    const newMilestoneDoneByEl = document.getElementById("newMilestoneDoneBy");
    const submitMilestoneBtn = document.getElementById("submit-button-div");

    if(submitMilestoneBtn) {
        submitMilestoneBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const goalId = JSON.parse(JSON.stringify(e.target.dataset)).goalid;
            console.log(goalId);

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
            console.log(parseInt(GoalId), parseInt(MilestoneQuantity), new Date(MilestoneDoneBy));
            $.post("/api/new_Milestone", {
                GoalId: GoalId,
                MilestoneQuantity: MilestoneQuantity,
                MilestoneDoneBy: MilestoneDoneBy,
            })
                .then(() => {
                    console.log("success");
                    location.reload();
                })
                .catch((err) => console.error(err));
        };
        
    }

});