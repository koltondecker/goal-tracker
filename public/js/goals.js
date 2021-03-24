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

    $.get("api/all_goals", 
        console.log("Getting all goals")
    )
    .then((goalsData) => {
        
        goalsData.forEach((goal) => {

            const options = {
                chart: {
                height: 280,
                type: "radialBar",
                },
            
                series: [goal.goalNumber],
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
                labels: [goal.goalName]
            };
            
            const chart = new ApexCharts(document.getElementById("chart"), options);

            chart.render();

        });
    });

});