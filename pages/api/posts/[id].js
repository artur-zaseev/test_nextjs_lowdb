import { getPost, updatePost, deletePost } from 'database';

async function getSinglePost(req, res) {
  const id = Number(req.query.id);
  try {
    const post = await getPost(id);
    return res.status(200).json(post);
  } catch ({ message }) {
    return res.status(404).json({ message });
  }
}

async function runUpdate(req, res) {
  const id = Number(req.query.id);
  try {
    const title = req.body.title;
    const updatedPost = await updatePost(id, title);
    return res.status(200).json(updatedPost);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function runDelete(req, res) {
  const id = Number(req.query.id);
  try {
    const posts = await deletePost(id);
    return res.status(200).json(posts);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

export default async function (req, res) {
  const method = req.method;

  switch (method) {
    case 'GET':
      await getSinglePost(req, res);
      break;
    case 'PUT':
      await runUpdate(req, res);
      break;
    case 'DELETE':
      await runDelete(req, res);
      break;
    default:
      res.status(500).json({ message: `Unknown error` });
      break;
  }
}
