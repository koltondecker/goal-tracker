$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const loginError = $("#login-error");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      //TODO: Input message popup code here
      loginError.html("<i class='material-icons'>error_outline</i>&nbsp;Please fill out both email and password.");
    }
    else {
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
    }

    emailInput.val("");
    passwordInput.val("");
  });


//test

  // loginUser does a post to our "api/login" route and if successful, redirects us the the dashboard page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/dashboard");
        // If there's an error, log the error
      })
      .catch(err => {
        console.error(err);
        loginError.html("<i class='material-icons'>error_outline</i>&nbsp;Email or Password are incorrect. Please try again.");
      });
  }
});
