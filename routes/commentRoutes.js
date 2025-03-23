import { Router } from "express";
import { createComment,fetchAllComments, fetchSingleComment } from "../controller/commentController.js";

const router = Router();

router.post('/', createComment)
router.get('/', fetchAllComments)
router.get('/:id', fetchSingleComment)

export default router