module.exports = function (sequelize, DataTypes) {
    //define milestones model (table)
    const Milestone = sequelize.define("Milestone", {

        numberDone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                notNull: {
                    msg: "Number completed in this goal milestone must be an integer"
                },
            }
        },
        doneBy: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true
            }
        }
    });
    
    return Milestone;
};