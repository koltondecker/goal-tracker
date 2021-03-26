$(document).ready(() => {

    const newMilestoneQuantityEl = document.getElementById("newMilestoneQuantity");
    const newMilestoneDoneByEl = document.getElementById("newMilestoneDoneBy");
    const submitMilestoneBtn = document.getElementById("submit-button-div");
    const viewAllMilestonesBtn = document.querySelectorAll(".view-all-milestones-button");

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

    if(viewAllMilestonesBtn) {
        viewAllMilestonesBtn.forEach((button) => {
            button.addEventListener("click", (e) => {
                const goalId = JSON.parse(JSON.stringify(e.target.dataset)).goalid;
                const tableEntries = document.getElementById(`table-entries-${goalId}`);

                tableEntries.innerHTML = "";

                $.get(`/api/all_milestones/${goalId}`)
                .then((milestonesData) => {

                    milestonesData.response.forEach((milestone) => {

                        const newValueTd = `<td>${milestone.numberDone}</td>`;
                        const newDateTd = `<td>${moment(milestone.doneBy).format("MMMM Do YYYY")}</td>`;

                        const html = `
                        <tr>
                            ${newValueTd}
                            ${newDateTd}
                        </tr>
                        `;

                        tableEntries.innerHTML += html;
                    });
                    
                });
            });
        });
    }

});