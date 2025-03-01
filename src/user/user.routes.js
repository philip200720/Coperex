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
 *     tags: [User]
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Error getting user
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieves a list of all users.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Error getting users
 */
router.get("/", listValidator, getUsers);

/**
 * @swagger
 * /deleteUser:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes an existing user from the system.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 description: The unique identifier of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized to delete user
 *       404:
 *         description: User not found
 *       500:
 *         description: Error deleting user
 */
router.delete("/deleteUser", deleteUserValidator, deleteUser);

export default router;