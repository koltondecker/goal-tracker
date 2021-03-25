const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
    //define goals model (table)
    const Goal = sequelize.define("Goal", {
        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     unique: true,
        //     validate: {
        //         isNumber: true,
        //         notNull: {
        //             msg: "User ID must be an integer"
        //         },
        //     }
        // },
        goalName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 25],
            }
        },
        goalNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                notNull: {
                    msg: "Your goal must be an integer"
                },
            }
        },
        doBy: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
                notNull: {
                    msg: "You must include a date"
                }
            },
        }
    });
    // Associating goals with milestones table
    Goal.associate = (models) => {
        //when a goal is deleted, so are their milestones
        Goal.hasMany(models.Milestone, {
            onDelete: "cascade",
        });
    };
    return Goal;
};