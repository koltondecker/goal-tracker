module.exports = function (sequelize, DataTypes) {
    //define goals model (table)
    const goals = sequelize.define("goals", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                isNumber: true,
                notNull: {
                    msg: "User ID must be an integer"
                },
            }
        },
        goalName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isString: true,
                len: (2, 25),
            }
        },
        goalNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumber: true,
                notNull: {
                    msg: "Your goal must be an integer"
                },
            }
        },
        doBy: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true
            }
        }
    });
    // Associating goals with milestones table
    goals.associate = (models) => {
        //when a goal is deleted, so are their milestones
        goal.hasMany(models.milestones, {
            onDelete: "cascade",
        });
    };
    return goals;
};