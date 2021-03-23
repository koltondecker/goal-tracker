// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the homepage page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    // res.json({
    //   email: req.user.email,
    //   id: req.user.id
    // });
    db.User.findOne({
      where: {
        id: req.user.id
      }
    })
    .then(() => {
      const email = JSON.stringify(req.user.email);
      res.render("dashboard", {
        // user: req.User,
        email: email,
        // nickname: req.nickname,
      });

    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
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
    console.log(req.user.id, req.body.goalName, parseInt(req.body.goalNumber), req.body.doBy);
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
      GoalId: 1,
      numberDone: req.body.MilestoneNumber,
      doneBy: req.body.MilestoneDoneBy
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
    db.User.findAll({
      where: {
        id: req.user.id
      },
      include: [db.Goal]
    })
    .then((response) => {
      res.send({response});
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
      res.send({response});
    })
    .catch(err => {
      res.status(401).json(err);
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
