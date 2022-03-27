import { getPosts, addPost } from 'database';

async function getAllPosts(req, res) {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: `Cant get posts` });
  }
}

async function createPosts(req, res) {
  try {
    const newPost = await addPost(req.body.title);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: `Cant create posts` });
  }
}

export default async function handler(req, res) {
  const method = req.method;

  switch (method) {
    case 'GET':
      await getAllPosts(req, res);
      break;
    case 'POST':
      await createPosts(req, res);
      break;
    default:
      res.status(500).json({ message: `Unknown error` });
      break;
  }
}
