$(document).ready(() => {
    const newGoalNameEl = document.getElementById("newGoalName");
    const newGoalNumberEl = document.getElementById("newGoalNumber");
    const newGoalDoByEl = document.getElementById("newGoalDoBy");
    const newGoalSubmitBtn = document.getElementById("newGoalSubmitBtn");
    // const expandGoalBtn = document.querySelector(".goal-button");
    const deleteGoalBtns = document.querySelectorAll(".deleteGoalBtn");
    const saveChangesBtn = document.querySelectorAll(".saveChangesBtn");

    if(newGoalSubmitBtn) {
        newGoalSubmitBtn.addEventListener("click", (e) => {
            e.preventDefault();

            console.log("hello world");


            const newGoalData = {
                goalName: newGoalNameEl.value.trim(),
                goalNumber: newGoalNumberEl.value.trim(),
                doBy: newGoalDoByEl.value.trim()
            };


            insertGoal(newGoalData.goalName, newGoalData.goalNumber, newGoalData.doBy);
            newGoalNameEl.value="";
            newGoalNumberEl.value="";
            newGoalDoByEl.value="";
        });
        
        const insertGoal = (goalName, goalNumber, doBy) => {
            $.post("/api/new_goal", {
            goalName: goalName,
            goalNumber: goalNumber,
            doBy: doBy
            })
            .then(() => {
                console.log("success");
                window.location.replace("/dashboard");
            })
            .catch((err) => console.error(err));
        };

    }

    $.get("api/all_goals")
    .then((goalsData) => {
        
        goalsData.forEach((goal) => {

            $.get(`api/sum_all_milestones/${goal.id}`)
            .then((milestonesData) => {

                const calculatePercentageCompleted = () => {

                    const totalCompleted = parseInt(milestonesData[0].total_completed);
                    const overallGoal = parseInt(goal.goalNumber);
                    const percentComplete = Math.floor((totalCompleted / overallGoal) * 100);


                    if(percentComplete < 0) {
                        return 0;
                    }
                    else if(percentComplete > 100) {
                        return 100;
                    } 
                    else if(!percentComplete) {
                        return 0;
                    }
                    return percentComplete;

                };
                
                
                const now = moment().format("MMMM Do YYYY");
                const dueDate = moment(goal.doBy).utcOffset(5).format("MMMM Do YYYY");

                const isNow = moment();
                const goalDate = moment(goal.doBy);

                const daysLeft = goalDate.diff(isNow, "days");
                    
                    $(`#daysLeft-${goal.id}`).append(daysLeft);
                    $(`#goalDate-${goal.id}`).append(dueDate);

                const options = {
                    chart: {
                    height: 280,
                    type: "radialBar",
                    },
                    
                    series: [calculatePercentageCompleted()],
                    colors: ["#20E647"],
                    plotOptions: {
                    radialBar: {
                        hollow: {
                        margin: 0,
                        size: "70%",
                        background: "#293450"
                        },
                        track: {
                        dropShadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            blur: 4,
                            opacity: 0.15
                        }
                        },
                        dataLabels: {
                        name: {
                            offsetY: -10,
                            color: "#fff",
                            fontSize: "13px"
                        },
                        value: {
                            color: "#fff",
                            fontSize: "30px",
                            show: true
                        }
                        }
                    }
                    },
                    fill: {
                    type: "gradient",
                    gradient: {
                        shade: "dark",
                        type: "vertical",
                        gradientToColors: ["#87D4F9"],
                        stops: [0, 100]
                    }
                    },
                    stroke: {
                    lineCap: "round"
                    },
                    labels: ["Progress"]
                };
                
                const chart = new ApexCharts(document.getElementById(`chart-${goal.id}`), options);
    
                chart.render();
            });
        });
    });

    // if(expandGoalBtn) {
    //     expandGoalBtn.addEventListener("click", (e) => {
    //         e.preventDefault();


    //     });
    // }

    if(deleteGoalBtns) {
        deleteGoalBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener("click", (e) => {

                fetch(`/api/Goal_Delete/${JSON.parse(JSON.stringify(e.target.dataset)).goalid}`, {
                    method: "DELETE",
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    }
                }).then((response, error) => {

                    if (response.ok) {
                        console.log("goal deleted");
                        location.reload("/");
                    } else {
                        console.err(error);
                    }
                });
            });
        });
        
    }

    if(saveChangesBtn) {
        saveChangesBtn.forEach((editBtn) => {
            editBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const goalId = JSON.parse(JSON.stringify(e.target.dataset)).goalid;

                const updateGoalObj = {
                    goalName: document.getElementById(`newGoalName-${goalId}`).value.trim(),
                    goalNumber: document.getElementById(`newGoalNumber-${goalId}`).value.trim(),
                    doBy: document.getElementById(`newGoalDoBy-${goalId}`).value.trim()
                };

                fetch(`/api/update_goal/${goalId}`, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateGoalObj),
                })
                .then(() => {
                    console.log("Updating goal");
                    location.reload();
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
            });

        });
    }

});