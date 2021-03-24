const daysRemaining = () => {
    let oneDay= 24 * 60 * 60 * 1000 //hours*minutes*seconds*millisenconds
    let today = new Date();
    let deadline = new Date(goal.doBy);
    let daysTilDeadline = Math.round(Math.abs((today-deadline)/oneday));

    return daysTilDeadline
};