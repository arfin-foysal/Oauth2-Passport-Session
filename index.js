const express = require("express");
const passport = require("passport");
const session=require('express-session');

const app = express();
require("./passportAuth");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(session({
    secret: 'zjhxcsahxcujshjxchsjchs',
    resave: false,
    saveUninitialized: true,
    name:"arfin",
    cookie: {
        secure: false,
        maxAge:100*60*60*24
       
    }
  }))
app.use(passport.session())

const gard = (req, res, next) => {
  
   req.session.userId == req.user.id ? next(): res.render('index')
}



app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
  
  );
  
  app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.userId=req.user.id  
    res.redirect('/sucess');
  });
  
  // github
  app.get('/auth/github',
    passport.authenticate('github'));
  
  app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.userId=req.user.id 
    res.redirect('/sucess');
  });


  app.get("/login", (req, res) => {
    res.render("index");
    
  });
  app.get("/logout", (req, res) => {
    req.logOut()
    res.redirect('/login')
    
  });


app.get("/sucess", gard,(req, res) => {
    res.render("sucess.ejs");
  
});


app.listen(5000, () => {
  console.log("server on 5000");
});
