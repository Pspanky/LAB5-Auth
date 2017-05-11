import Post from '../models/post_model';

export const createPost = (req, res) => {
  const newpost = new Post();

  newpost.content = req.body.content;
  newpost.title = req.body.title;
  newpost.cover_url = req.body.cover_url;
  newpost.tags = req.body.tags;

  newpost.save().then((newPost) => {
    res.send(newPost).catch((error) => {
      console.log(error);
    });
  });
};

export const getPosts = (req, res) => {
  return Post.find({})
  .then((myPosts) => {
    if (myPosts === undefined) {
      res.send('nothing here');
    } else {
      res.send(myPosts);
    }
  }).catch((err) => {
    console.log(err);
    res.send(err);
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
  .then((post) => {
    res.send(post);
  }).catch((err) => {
    res.send(err);
  });
};

export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id })
  .then((post) => {
    res.send('successful delete');
  }).catch((err) => {
    res.send(err);
  });
};

export const updatePost = (req, res) => {
  Post.update({ _id: req.params.id }, req.body)
  .then((post) => {
    res.send('you did my person');
  });
};
