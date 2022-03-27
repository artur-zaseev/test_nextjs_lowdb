import { db } from './database.js';

export const getPosts = async () => {
  try {
    await db.read();
    return db.data.posts;
  } catch (error) {
    throw new Error(`Cant get all posts`);
  }
};

export const getPost = async (id) => {
  try {
    await db.read();
    const post = db.data.posts.find((post) => post.id === +id);
    if (!post) throw new Error('post not found');
    return post;
  } catch (error) {
    throw new Error(`Cant get post`);
  }
};

export const addPost = async (title) => {
  try {
    if (!title) throw new Error('No title!');
    const newPost = { id: Date.now(), title };
    await db.read();
    db.data.posts.push(newPost);
    await db.write();
    return newPost;
  } catch (error) {
    throw new Error(`Cant add post`);
  }
};

export const updatePost = async (id, title) => {
  try {
    if (!id) throw new Error('No id!');
    if (!title) throw new Error('No title!');
    await db.read();
    const post = db.data.posts.find((post) => post.id === +id);
    post.title = title;
    await db.write();
    return post;
  } catch (error) {
    throw new Error(`Cant update post`);
  }
};

export const deletePost = async (id) => {
  try {
    if (!id && id !== 0) throw new Error('No id!');
    await db.read();
    const newPosts = db.data.posts.filter((post) => post.id !== +id);
    db.data.posts = newPosts;
    await db.write();
    return newPosts;
  } catch (error) {
    throw new Error(`Cant delete post`);
  }
};
