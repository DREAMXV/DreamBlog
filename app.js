require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");

const blogRoute = require('./routes/blogRoutes');
app.set("view engine", "ejs");

const morgan = require("morgan");

//Connect to db
mongoose
  .connect(process.env.DBURI)
  .then((result) =>
    app.listen(process.env.PORT, () => {
      console.log("Server Started on Port " + process.env.PORT);
    })
  )
  .catch((err) => console.log(err));
//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
//
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use('/blogs' ,blogRoute)

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Not Found" });
});
