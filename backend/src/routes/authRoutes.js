import express from "express"
import { getUser, createUser, logout } from "../controllers/authController.js";

const router = express.Router();

router.post('/', createUser);
router.post('/login', getUser);
router.post('/logout', logout);
// router.post('/doctor', createDoctor);
// router.get('/doctor', getDoctor);

export default router;