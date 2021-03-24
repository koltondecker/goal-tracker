$(document).ready(() => {
    const newGoalNameEl = document.getElementById("newGoalName");
    const newGoalNumberEl = document.getElementById("newGoalNumber");
    const newGoalDoByEl = document.getElementById("newGoalDoBy");
    const newGoalSubmitBtn = document.getElementById("newGoalSubmitBtn");
    // const expandGoalBtn = document.querySelector(".goal-button");
    const deleteGoalBtns = document.querySelectorAll(".deleteGoalBtn");

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

                    return (percentComplete ? percentComplete : 0);
                };
                
                const daysRemaining = () => {
                    const oneDay= 24 * 60 * 60 * 1000; //hours*minutes*seconds*millisenconds
                    const today = new Date();
                    const deadline = new Date(goal.doBy);
                    const daysTilDeadline = Math.round(Math.abs((today-deadline)/oneDay));

                    return daysTilDeadline;
                };

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

});