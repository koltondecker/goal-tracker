// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
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

  app.post("/api/new_milestone", (req, res) => {
    db.Milestone.create({
      goalId: req.body.goalId,
      numberDone: req.body.numberDone,
      doneBy: req.body.doneBy
    })
    .then(() => {
      res.json({ id: req.user.id });
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

  // DELETE route for deleting User
  app.delete("/api/User/:id", (req, res) => {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbTracker) => res.json(dbTracker));
  });

  //PUT route for updating milestone
  app.put("/api/update_milestone/:id", (req, res) => {
    db.Milestone.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then((dbTracker) => res.json(dbTracker));
  });
};
