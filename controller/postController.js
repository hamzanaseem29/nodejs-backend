// create post

import prisma from "../db/db.config.js";

export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;

  const newPost = await prisma.post.create({
    data: {
      user_id,
      title,
      description,
    },
  });

  return res.json({
    status: 200,
    data: newPost,
    message: "Post Created Sucessfully!",
  });
};

// fetch all posts

export const getAllPosts = async (req, res) => {
  const fetchedData = await prisma.post.findMany({
    include: {
        comment: true
        
    }
  });

  return res.json({
    status: 200,
    data: fetchedData,
    message: "data fetched sucessfully!",
  });
};

// fetch single posts

export const getSinglePost = async (req, res) => {
  const userId = req.params.id;

  const findUser = await prisma.post.findFirst({
    where: {
      id: Number(userId),
    },
  });

  return res.json({
    status: 200,
    data: findUser,
    message: "User fetched sucessfully!",
  });
};

// delete post

export const deletePost = async (req, res) => {
  const userId = req.params.id;

  const removePost = await prisma.post.delete({
    where: {
      id: Number(userId),
    },
  });

  res.json({
    status: 200,
    data: removePost,
    message: "Post deleted sucessfully!",
  });
};

// update post
export const updatePost = async (req, res) => {
  const userId = req.params.id;

  const { user_id, title, description } = req.body;

  const updatePostData = await prisma.post.update({
    where: {
      id: Number(userId),
    },
    data: {
      user_id,
      title,
      description,
    },
  });

  return res.json({
    status: 200,
    data: updatePostData,
    message: "Post updated sucessfully!",
  });
};
