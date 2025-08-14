import express from "express"
import {getUser,createUser} from "../controllers/authController.js";

const router = express.Router();

router.post('/login', getUser);
router.post('/', createUser);

export default router;