const db = require("../db/queries");

async function getUsernames(req, res) {
  const usernames = await db.getAllUsernames();
  console.log("Usernames: ", usernames);
    // res.send("Usernames: " + usernames.map(user => user.username).join(", "));
    res.render('index')
}

async function createUsernameGet(req, res) {
  // render the form
  res.render('form');
}

async function createUsernamePost(req, res) {
  const { username } = req.body.userName;
  
  await db.insertUsername(username);
  res.redirect("/");
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost
};
