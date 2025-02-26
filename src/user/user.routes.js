import { Router } from "express";
import { listValidator, getUserByIdValidator, deleteUserValidator } from "../middlewares/user-validator.js";
import { getUserById, getUsers, deleteUser } from "./user.controller.js";

const router = Router();

/**
 * @swagger
 * /findUser/{uid}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieves a list of all users.
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", listValidator, getUsers);

/**
 * @swagger
 * /deleteUser:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes an existing user from the system.
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/deleteUser", deleteUserValidator, deleteUser);

export default router;
