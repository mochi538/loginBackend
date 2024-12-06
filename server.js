const express = require("express");
/* const passport = require("passport"); */
const cors = require("cors");
const bodyParser = require("body-parser");
/* const GoogleStrategy = require("passport-google-oauth20").Strategy; */
const authRoutes = require("./routes/usersRoute");

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

/* passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => dine(null, user));
passport.deserializeUser((user, done) => dine(null, user));

app.use(passport.initialize());
app.use(passport.session());

 */
/* app.get(
  "auth/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

app.get("/profile", (req, res) => {
  res.send(`Hola, ${req.user.displayName}`);
}); */

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}/api/auth`)
);
