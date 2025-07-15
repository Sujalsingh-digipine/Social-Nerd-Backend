import { PostModel } from "../models/post.model";
import { Post } from "../types/PostType";

export const createPost = async (data: Partial<Post>) => {
  const newPost = await PostModel.create(data);
  return newPost;
};

export const getPosts = async () => {
  try {
    const posts = await PostModel.find()
      .populate({
        path: "reactions",
        populate: {
          path: "userId",
          select: "username avatar",
        },
      })
      .populate("createdBy", "username avatar")
      .populate({
        path: "comments",
        populate: {
          path: "authorId",
          select: "username avatar",
        },
      });

    return posts;
  } catch (error: any) {
    console.error("Error in getPosts service:", error.message);
    throw new Error("Failed to fetch posts");
  }
};

export const getPostById = async (id: string) => {
  try {
    const post = await PostModel.findById(id)
      .populate("createdBy", "username avatar")
      .populate({
        path: "comments",
        populate: { path: "authorId", select: "username avatar" },
      })
      .populate({
        path: "reactions",
        populate: { path: "userId", select: "username avatar" },
      });

    if (!post) throw new Error("Post not found");

    return post;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw new Error("Failed to get post by ID");
  }
};

export const updatePost = async (id: string, data: Partial<Post>) => {
  try {
    const Post = await PostModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!Post) throw new Error("Post not found to update");
    return Post;
  } catch (error: any) {
    console.error("Error updating post", error.message);
    throw new Error("Failed to update post");
  }
};

export const deletePost = async (id: string) => {
  try {
    const deletedPost = await PostModel.findByIdAndDelete(id);
    if (!deletedPost) throw new Error("Post not found to delete");
    return deletedPost;
  } catch (error: any) {
    console.error("Error deleting post", error.message);
    throw new Error("Failed to delete post");
  }
};
