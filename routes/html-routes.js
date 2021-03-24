// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the dashboard page
    // if (req.user) {
    //   res.redirect("/dashboard");
    // }
    // res.sendFile(path.join(__dirname, "../public/index.html"));
    res.render("index", {});
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the dashboard page
    // if (req.user) {
    //   res.redirect("/dashboard");
    // }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page

  app.get("/dashboard", isAuthenticated, (req, res) => {
    db.Goal.findAll({
      where: {
        UserId: req.user.id
      },
      include: [db.Milestone]
    })
    .then((response) => {
      const goalsData = JSON.parse(JSON.stringify(response));
      res.render("dashboard", {"firstName": req.user.firstName, "lastName": req.user.lastName, "goals": goalsData});
    });
  });
};
