const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      // Connection Confguration to Google authentication
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://shrouded-island-60690.herokuapp.com/google/callback",
      passReqToCallback: true,
    },
    // What to do once the user is successfully authenticated
    // function (request, accessToken, refreshToken, profile, done) {
    //   //The function below is useful when connected to a DB such that
    //   //you can create a new user or find existing users
    //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return done(err, user);
    //   });
    // }
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile); // if you have a db the null will be an err
    }
  )
);

// Serialize and Deserialize Users -- Setting up for user sessions/cookies
passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
    done(null, user);
  });