# Climb Rater
### Built with React
![ClimbRater App mobile](https://s3.amazonaws.com/wibbed/climbing/screenshotfromapp.png)

What are you waiting for? Check out the deployed [site](https://briankeegan.github.io/climb-rater/)

Is designed by a climber for climbers.  When routes are put up in gyms, the rating often seems off, either too hard or to easy.  I what to crowdsource the feel of the climb, and allow climbers to review climbs, both on how  much liked them and what grade they think they are.

###  Navigation

You don’t have be logged in to navigate and view ratings.  To rate, you will have to log in.
Click on the section, and within the section pick the route.  They are organized by number and color.  You can view what the gym says it’s rated at and what others think, and what you think!

### The other side

The backend was built with mongoDb, express.js and mongoose.
Check it out!

[Repo](https://github.com/briankeegan/climb-rater-api)

[Heroku API](https://climb-rater-api.herokuapp.com/)


### How to Contribute
-  Fork and clone
-  npm install
-  Checkout to refactor branch (just make sure the api is pointing to https://climb-rater-api-development.herokuapp.com/ while working on local host:3000)
-  I'll review your contributions or suggestions
-  Thanks!

### Technologies
- React.js
- React Router Dom
- JavaScript (always and everywhere!)
- Fetch browser API for HTTP calls
- Materialize.css
-  React Materialize
- Node.js

### Unsolved
- I want to add carabiner rating system, like with stars
- I want to auto-populate form on update rating
- Refactor, refactor, refactor. (Separate components into different files)

### Planning and Process
This is my first React.js app.
As I built components, I would start by hard-coding everything, and adding in props/states bit by bit to make sure nothing broke.
I’m very impressed by the debugging of react in general as it gives you very detailed notifications of what went wrong


### Challenges
I found fetch to be pretty straight forward, but including npms like Materialize.css and React Materialize ended up taking more work than expected and a few reinstalls.
Additionally, I initially left most components in the App.js file, which ended up being cumbersome.  In future iterations I will seperate that code better

###  User Stories
As a climber I want to easily navigate to routes I’ve climbed, or want to climb
view ratings, grade, setter, and tags that other climbers have written

As a user I want to:

sign up and log in to a private account.
sign out
change my password

As a logged in user I want to:

As a climber I want to rate routes once per
As a climber I want to be able to edit my ratings

###  Prototype / Wireframe

Before I built the project, I created the wireframe followed by a prototype.  Although it's been adjusted slightly, my app is very simliar to the second proto.

This is what I sent out during testing.
"Could you try rating the Red 5.9, wall # 210 @ the island? (Each section at BK has a name!)
Once you get to "You've climbed this" test is over

Remember, limited functionality, this is not a site!  Rating, will auto populate.
Just testing user experience of site, flow, and number of clicks!"

[Wireframe](https://projects.invisionapp.com/freehand/document/EYrOKRHrT)

[Prototype version 1](https://projects.invisionapp.com/share/HJG13S4Y635#/screens)

[Prototype version 2](https://projects.invisionapp.com/share/2FG14IJYD5X#/screens/281363978_Climbing2-0p1)
