const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Post, User, Comment } = require("../models");


router.get("/", async (req, res) => {
  const postData = await Post.findAll({ include: [User] }).catch((err) => {
    res.json(err);
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render("homepage", { posts, loggedIn: req.session.loggedIn });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
      where: {
        user_id: req.session.user_id,
      },
    });
    console.log(JSON.stringify(postData));
    const posts = postData.map((post) => post.get({ plain: true }));
    if (req.session.loggedIn) {
      res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
      return;
    }
  } catch (err) {
    res.json(err);
  }
});


router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    let postedBy = false;
    if (postData.user_id === req.session.user_id) {
      postedBy = true;
    }

    const post = postData.get({ plain: true });

    const commentData = await Comment.findAll({
      include: [User],
      where: {
        post_id: req.params.id,
      },
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render("post", {
      post,
      comments,
      logged_in: req.session.logged_in,
      postedBy,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;