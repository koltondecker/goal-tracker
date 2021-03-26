module.exports = function (sequelize, DataTypes) {
    //define goals model (table)
    const Goal = sequelize.define("Goal", {

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
        units: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 25],
            }
        },
        doBy: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
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