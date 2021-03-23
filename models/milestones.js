module.exports = function (sequelize, DataTypes) {
    //define milestones model (table)
    const Milestone = sequelize.define("Milestone", {
        // goalId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     unique: true,
        //     validate: {
        //         isNumber: true,
        //         notNull: {
        //             msg: "Goal ID must be an integer"
        //         },
        //     }
        // },
        numberDone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                isNumber: true,
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