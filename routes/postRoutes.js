import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from "../controller/postController.js";

const router = Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
router.get("/:id", getSinglePost);
export default router;
