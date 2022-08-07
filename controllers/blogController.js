const Blog = require("../models/blog");

const blogIndex = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
const blogCreatePost = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};
const blogCreateGet = (req, res) => {
  res.render("create", { title: "Create New Blog" });
};
const blogDetails = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Blog Details", blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blogDelete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  blogIndex,
  blogCreateGet,
  blogCreatePost,
  blogDetails,
  blogDelete,
};
