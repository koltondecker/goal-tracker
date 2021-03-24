$(document).ready(() => {

    // const newMilestoneNumberEl = document.getElementById("newMilestoneName");
    const newMilestoneDoneByEl = document.getElementById("newMilestoneDoneBy");
    const newMilestoneSubmitBtn = document.getElementById("newMilestoneSubmitBtn");
    // const addMilestoneBtn = document.querySelector("milestone-button");
    // const progressBarDataArray = [50];

    if(newMilestoneSubmitBtn) {
        newMilestoneSubmitBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const newMilestoneData = {
                // MilestoneName: newMilestoneNumberEl.value.trim(),
                MilestoneDoneBy: newMilestoneDoneByEl.value.trim(),
            };

            insertMilestone(newMilestoneData.MilestoneNumber, newMilestoneData.MilestoneDoneBy);
        });
        
        const insertMilestone = (MilestoneNumber, MilestoneDoneBy) => {
            $.post("/api/new_Milestone", {
                MilestoneNumber: MilestoneNumber,
                MilestoneDoneBy: MilestoneDoneBy,
                // GoalId: this.goalNumber
            })
                .then((response) => {
                    console.log("success");
                    console.log(response);
                })
                .catch((err) => console.error(err));
        };
    }

    // if(addMilestoneBtn) {
    //     addMilestoneBtn.addEventListener("click", (e) => {
    //         e.preventDefault();


    //     });
    // }
    

    // const options = {
    //     chart: {
    //       height: 280,
    //       type: "radialBar"
    //     },
        
    //     series: progressBarDataArray,
        
    //     plotOptions: {
    //       radialBar: {
    //         hollow: {
    //           margin: 15,
    //           size: "70%"
    //         },
           
    //         dataLabels: {
    //           showOn: "always",
    //           name: {
    //             offsetY: -10,
    //             show: true,
    //             color: "#888",
    //             fontSize: "13px"
    //           },
    //           value: {
    //             color: "#111",
    //             fontSize: "30px",
    //             show: true
    //           }
    //         }
    //       }
    //     },
      
    //     stroke: {
    //       lineCap: "round",
    //     },
    //     labels: ["Progress"]
    //   };
      
    //   const chart = new ApexCharts(document.querySelector("#chart"), options);
      
    //   chart.render();

});