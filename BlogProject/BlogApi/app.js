const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8080;

// Libraries needed
const moment = require("moment");
const cors = require("cors");
// const corsOptions = {
// 	origin: ["http://localhost:5173/"],
// 	credentials: true,
// };
app.use(cors({ credentials: true }));
app.locals.moment = moment;
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Import routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.listen(PORT, () => console.log(`Its alive on http://localhost:${PORT}`));

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// Research on how api works with frontend
// Focus on user routes and controller first
// CRUD for user.

// Use axios for frontend.
