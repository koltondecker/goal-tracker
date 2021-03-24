// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const { sequelize } = require("../models");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the dashboard page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route to add a new goal to a user. 
  app.post("/api/new_goal", (req, res) => {
    db.Goal.create({
      goalName: req.body.goalName,
      goalNumber: parseInt(req.body.goalNumber),
      doBy: new Date(req.body.doBy),
      UserId: req.user.id,
    })
      .then(() => {
        res.json({ id: req.user.id });
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  //Route to add a new milestone for a goal.
  app.post("/api/new_milestone", (req, res) => {
    db.Milestone.create({
      numberDone: parseInt(req.body.MilestoneQuantity),
      doneBy: new Date(req.body.MilestoneDoneBy),
      GoalId: req.body.GoalId
    })
      .then(() => {
        res.json({ id: req.user.id });
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  //Route to view all goals for a user.
  app.get("/api/all_goals", (req, res) => {
    db.Goal.findAll({
      where: {
        UserId: req.user.id
      }
    })
    .then((response) => {
      res.json(response);
    })
    .catch(err => {
      res.status(401).json(err);
    });
  });

  //Route to view all milestones for a given goal.
  app.get("/api/all_milestones/:goalId", (req, res) => {
    db.Milestone.findAll({
      where: {
        GoalId: parseInt(req.params.goalId)
      }
    })
    .then((response) => {
      res.json({response});
    })
    .catch(err => {
      res.status(401).json(err);
    });
  });

  //Route for getting sum of milestones for a specific goal
  app.get("/api/sum_all_milestones/:goalId", (req, res) => {
    db.Milestone.findAll({
      where: {
        GoalId: parseInt(req.params.goalId)
      },
      attributes: [
        [sequelize.fn("sum", sequelize.col("numberDone")), "total_completed"]
      ]
    })
    .then((response) => {
      res.json(response);
    });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //Put route for updating goal
  app.put("/api/update_goal/:id", (req, res) => {
    db.Goal.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then((dbTracker) => res.json(dbTracker));
  });

//PUT route for updating milestone
  app.put("/api/update_milestone/:id", (req, res) => {
    db.Milestone.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then((dbTracker) => res.json(dbTracker));
  });

  // DELETE route for deleting User
  app.delete("/api/User_Delete", (req, res) => {
    db.User.destroy({
      where: {
        id: req.user.id,
      },
    }).then((dbTracker) => res.json(dbTracker));
  });

  //Route to delete a goal
  app.delete("/api/Goal_Delete/:id", (req, res) => {
    db.Goal.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbTracker) => res.json(dbTracker));
  });

  //Route to delete a milestone
  app.delete("/api/Milestone_Delete/:id", (req, res) => {
    db.Milestone.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbTracker) => res.json(dbTracker));
  });
};
