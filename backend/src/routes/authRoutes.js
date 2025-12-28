import express from "express"
import {getUser,createUser} from "../controllers/authController.js";

const router = express.Router();

router.post('/', createUser);
router.post('/login', getUser);

export default router;