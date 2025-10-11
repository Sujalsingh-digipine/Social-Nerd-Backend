import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth-user.middleware";
import { response } from "../utils/response";
import { HttpStatus } from "../utils/http-status";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../services/post.service";

export const createPostController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { caption, images, video } = req.body;
    const userId = req.user;

    if (!caption && images.length === 0 && !video) {
      return response(res, HttpStatus.BAD_REQUEST, {
        message: "Please provide a caption or an image or a video",
        data: null,
        success: false,
      });
    }

    const newPost = await createPost({
      caption,
      images,
      video,
      createdBy: userId,
    });
    return response(res, HttpStatus.CREATED, {
      message: "Post Created Successfully",
      data: newPost,
      success: true,
    });
  } catch (error: any) {
    console.log("Error Creating Post", error);
    return response(res, HttpStatus.INTERNAL_SERVER_ERROR, {
      message: "Something went wrong creating post",
      data: null,
      success: false,
    });
  }
};

export const getPostsController = async (req: Request, res: Response) => {
  try {
    const posts = await getPosts();
    return response(res, HttpStatus.OK, {
      message: "Posts fetched Successfully",
      data: posts,
      success: true,
    });
  } catch (error: any) {
    console.log("Error fetching posts", error);
    return response(res, HttpStatus.INTERNAL_SERVER_ERROR, {
      message: "Something went wrong fetching posts",
      data: null,
      success: false,
    });
  }
};

export const getPostByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const post = await getPostById(id);
    return response(res, HttpStatus.OK, {
      message: "Post Fetched Successfully",
      data: post,
      success: true,
    });
  } catch (error: any) {
    console.log("Error fetching post by id", error);
    return response(res, HttpStatus.NOT_FOUND, {
      message: "Post Not Found with this ID",
      data: null,
      success: false,
    });
  }
};

export const updatePostController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const post = req.body;

    const updated = await updatePost(id, post);
    return response(res, HttpStatus.CREATED, {
      message: "Post updated successfully",
      data: updated,
      success: false,
    });
  } catch (error: any) {
    console.error("Error updating Post", error);
    return response(res, HttpStatus.INTERNAL_SERVER_ERROR, {
      message: "Something went wrong updating Post controller",
      data: null,
      success: false,
    });
  }
};

export const deletePostController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await deletePost(id);
    return response(res, HttpStatus.OK, {
      message: "Post Deleted Successfully",
      data: deleted,
      success: true,
    });
  } catch (error: any) {
    console.error("Error deleting Post", error);
    return response(res, HttpStatus.INTERNAL_SERVER_ERROR, {
      message: "Something went wrong deleting Post controller",
      data: null,
      success: false,
    });
  }
};
