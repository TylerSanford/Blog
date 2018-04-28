const Post = require('../models/postModels');

const postCreate = (req, res) => {
  const { title, content, author } = req.body;
  const newPost = new Post({ title, content, author });
  newPost.save(newPost, (err, savedPost) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(savedPost);
  });
};

const postsGetAll = (req, res) => {
  Post.find({})
    .select('title')
    .exec()
    .then(posts => {
      if (posts.length === 0) throw new Error();
      res.json(posts);
    })
    .catch(err => res.status(422).json(err));
};

const postGetById = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .populate('author comments.author', 'username')
    .exec()
    .then(singlePost => {
      if (singlePost === null) throw new Error();
      res.json(singlePost);
    })
    .catch(err => res.status(422).json(err));
};

const postCommentAdd = (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;
  const comment = { author, text };
  Post.findById(id)
    .then(post => {
      if (post === null) throw new Error();
      const comments = post.comments;
      comments.push(comment);
      post
        .save()
        .then(newPost => {
          Post.findById(newPost._id)
            .populate('comments.author', 'username')
            .exec((badError, savedPost) => {
              if (badError) {
                throw new Error();
              }
              res.json(savedPost);
            });
        })
        .catch(err => {
          throw new Error();
        });
    })
    .catch(err => res.status(422).json({ error: 'No Post!' }));
};

module.exports = {
  postCreate,
  postsGetAll,
  postGetById,
  postCommentAdd
};

// const deletePost = (req, res) => {};

// const addUser = (req, res) => {
//   const { username, password } = req.params;
//   // const { username, password } = req.body;
//   const newUser = new User({ username, password });
//   newUser
//     .save()
//     .then(addedUser => {
//       res.json(addedUser);
//     })
//     .catch(err => {
//       res.status(STATUS_USER_ERROR).json({ errorMessage: err.message });
//       return;
//     });
// };
