# GOAL TRACKER

## INTRO

We know you're busy. We know you still have goals and aspirations. It can be hard to keep track of those goals when you don't have a way to manage them and keep yourself accountable.

Here at Goal Tracker by KSCC, we've got your back. This easy-to-use Goal Tracker App allows you to track your goals, log your progress, and hold yourself accountable by giving yourself a completion date.

What we love about this app is that it is adaptable to any lifestyle. It's not specific to home ownership, fitness, schoolwork, or anything that doesn't apply to you. It can be any or all of these things! You choose your goals. You choose your pace. You log your progress. If you need more time, that's okay! You can update the completion date or the target goal.

You can do it!

[Click here to try it out](https://goal-tracker-kscc.herokuapp.com/)

## TABLE OF CONTENTS

* [Intro](#intro)
* [Description](#description)
* [Installaion](#installation)
* [Usage](#usage)
* [Credits](#credits)

## DESCRIPTION

Goal Tracker is a javascript-based web-app deployed on heroku that uses Handlebars, Express, Moment, Apex Charts, and more npm programs to provide the user with a simple, yet effective and polished interface to track, log, and update their goals. 

![Landing Page](/public/img/landing.png)

The landing page directs the user to create an account. The simple sign in page only asks for your first and last name, a uniquie username, your email, and a password. The password is then encrypted so even our dev team can't see it. (This protects the user's privacy). If you already have an account, you can click "Log In" to enter only your email and password, and you're good to go!

![Sign Up](/public/img/signup.png)
![Log In](/public/img/login.png)

After logging in or signing up, the user is directed to their Dashboard. Here, there is an area to enter a new goal. This can be anything, any amount, and any unit of measure. For example, if your goal is "Practice Piano" the target number can be in minutes, hours, or whatever you want! If you goal is "Run 10 miles" you would specify "miles". You will also set a target completion date, and submit your info.

![Add a Goal](/public/img/addgoal.png)

Once you've entered a goal (or a few), they'll each pop up as a card on the page. Here, you can view all the information about your goal, including a progress bar for a visual representation of how far you've come. There are also a couple of buttons on these cards to help you manage the goal. There's a little edit pencil at the top that triggers a card reveal form, allowing you to edit your goal. You can also delete a goal, or add a milestone. There is a dropdown from each card that shows each milestone you've logged.

![Dashboard](/public/img/dashboard.png)
![Edit a Goal](/public/img/editgoal.png)

As you add milestones, these will be logged to the dropdown. All of your progress is summed and shown in the progress bar. If you've run 4 out of the 10 miles you've promised, the progress bar will show 40%. 

![Milestone View](/public/img/milestones.png)

You can also toggle the view of this page, by the "Toggle View" button in the navigation bar. There is a dark mode and a light mode, to best suit your preferences!

![Toggle View](/public/img/toggleview.png)

## INSTALLATION

This one is easy. Since this app is delpoyed to heroku, you can just click [this link](https://goal-tracker-kscc.herokuapp.com/) to get to the app. You'll need to create an account, and then you're ready to start logging your goals!

*Local Installation*

If you prefer to run this app locally, it is recommended that you clone this repo to a folder on your local device.  Open the repo
in the code editor of your choice.  

Step 1: Open an integrated terminal from inside the project folder and use the following command to install all required dependencies:
```
npm i
```

Step 2: Create an empty database in MySQL workbench with the following one line of MySQL code:
```
CREATE DATABASE project_tracker
```
Step 3: In the root directory of the project folder, create a .env file that contains the following three lines of code:
```
DB_USER=root
DB_PW=(insert your MySQL password here)
DB_NAME=progress_tracker
```

This application is invoked by entering 'node index.js' into the terminal. Then navigating to the localhost server specified in the app (Port 8080).

## CREDITS

This project was created by our KSCC Dev Team

[Kolton Decker](https://github.com/koltondecker)
[Steve Babb](https://github.com/verusbabb)
[Christina Moss](https://github.com/cmoss703)
[Carly Gouge](https://github.com/cgouge93)

[Github Repo](https://github.com/koltondecker/goal-tracker)

