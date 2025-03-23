import { Router } from "express";
import {
  createUser,
  deleteUser,
  fetchUsers,
  showUser,
  updateUser,
} from "../controller/UserController.js";

const router = Router();

router.post("/", createUser);
router.get("/", fetchUsers);
router.get("/:id", showUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
