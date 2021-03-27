$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const firstName = $("#first-name");
  const lastName = $("#last-name");
  const username = $("#username");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const signupError = $("#signup-error");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      username: username.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.firstName || !userData.lastName || !userData.username || !userData.email || !userData.password) {
      signupError.html("<i class='material-icons'>error_outline</i>&nbsp;Please fill out all inputs.");
    }
    else {
    // If we have an email and password, run the signUpUser function
      signUpUser(userData.firstName, userData.lastName, userData.username, userData.email, userData.password);
    }
    
    firstName.val("");
    lastName.val("");
    username.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstName, lastName, username, email, password) {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/dashboard");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      // .catch(handleLoginErr);
      .catch(err => {
        console.log(err);
        signupError.html("<i class='material-icons'>error_outline</i>&nbsp;User Account already exists!");
      });
  }
  
});
