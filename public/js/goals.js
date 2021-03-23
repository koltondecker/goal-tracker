$(document).ready(() => {
    const newGoalNameEl = document.getElementById("newGoalName");
    const newGoalNumberEl = document.getElementById("newGoalNumber");
    const newGoalDoByEl = document.getElementById("newGoalDoBy");
    const newGoalSubmitBtn = document.getElementById("newGoalSubmitBtn");

    if(newGoalSubmitBtn) {
        newGoalSubmitBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const newGoalData = {
                goalName: newGoalNameEl.value.trim(),
                goalNumber: newGoalNumberEl.value.trim(),
                doBy: newGoalDoByEl.value.trim()
            };

            insertGoal(newGoalData.goalName, newGoalData.goalNumber, newGoalData.doBy);
        });
        
        const insertGoal = (goalName, goalNumber, doBy) => {
            $.post("/api/new_goal", {
            goalName: goalName,
            goalNumber: goalNumber,
            doBy: doBy
            })
            .then(console.log("success"))
            .catch((err) => console.error(err));
        };
    }
    
});