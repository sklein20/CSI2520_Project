//const express = require("express");
//const ejs = require("ejs");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("./auth");

//create express app
//const app = new express();



// Define a Middleware function to check if the user is already logged in
// The next param. is pointing to the next end-point to go to, once the middleware function is done executing
function isLoggedIn(req, res, next) {
    // Logic: If the req object already has user credentaial, then pass it onto the next point, else return a 401 status (unauthorized acccess)
    req.user ? next() : res.sendStatus(401);
  }

const app = new express();

//Initialize Body Parser Middleware to Parse Data Sent By Users
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Initialize EJS Middleware
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

// Declare session usage as a middleware
app.use(session({ secret: "skjhs38v++?)akjfcd/223512FneP" })); // use a more complicated secret and save it in the .env file.
app.use(passport.initialize());
app.use(passport.session());

//Begin Server Logic
//Routes
app.get("/", (req, res) => {
    //res.render("index");
    res.send('<a href="/auth/google">Login with Google </a>');
});

// Define Route: /auth/google to redirect user to goto Google Authentication Page
app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

app.get(
   "/google/callback",
   passport.authenticate("google", {
     successRedirect: "/protected", // what to do when successful login
     failureRedirect: "auth/failure", // what to do when unsuccesful login
    })
);

// Create a protected route for successful redirect -- Users won't be able to access this route unless successfully logged in.
app.get("/protected", isLoggedIn, (req, res) => {
    //   res.send("You are now logged in");
    //res.send(`Hello.... ${req.user.displayName}`);
    res.render("index");
  });

// Define a failure route for redirect on invalid login in
app.get("/auth/failure", (req, res) => {
    res.send("You were not authenticated.. Try again next time");
  });
  
  // Define a route for logging out
  app.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.send("You have been successfully logged out... Goodbye!");
  });
  
//create a protected route
// app.get('/protected', (req, res) => {
//     res.send("This is a Protected Page");
// });

app.get("/books", (req, res) => {
    res.render("./html/books");
});

app.get("/games", (req, res) => {
    res.render("./html/games");
});

app.get("/login", (req, res) => {
    res.render("./html/login");
});

app.get("/movies", (req, res) => {
    res.render("./html/movies");
});

app.get("/music", (req, res) => {
    res.render("./html/music");
});

app.get("/tvShows", (req, res) => {
    res.render("./html/tvShows");
});
//Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Server Started on Port No. ${PORT}`);});