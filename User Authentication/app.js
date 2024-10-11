/////// app.js

const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;

const pool = new Pool({
  // add your configuration
  connectionString:"postgresql://postgres:apple@localhost:5432/UserAuthentication",
});

const app = express();
//app.set("views", __dirname);
app.use((req,res,next) => {
    res.locals.path = req.path;
    next();
})
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index", { user: req.user });
  });
  

app.get('/sign-up', (req, res) => res.render("sign-up-form"));


app.post("/sign-up", async (req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err){
                console.error(err)
            }
            await pool.query("INSERT INTO users(username, password) VALUES ($1, $2)",[req.body.username,hashedPassword])

        })

    

    //   await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    //     req.body.username,
    //     bcrypt.hash(req.body.password,10),
    //   ]);
      res.redirect("/");
    } catch(err) {
      return next(err);
    }
  });
  
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
  

app.listen(8080, () => console.log("app listening on port 8080!"));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });
  

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = rows[0];
  
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password,user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = rows[0];
  
      done(null, user);
    } catch(err) {
      done(err);
    }
  });
    