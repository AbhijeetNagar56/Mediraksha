import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import { deleteUser, updateBio, updatePassword } from '../controllers/userController.js';
const router = express.Router();



// Protected route
router.get('/', authMiddleware, (req, res) => {
  res.json({ msg: 'Welcome to protected route!', user: req.user });
});
router.put('/:username', updatePassword);
router.delete('/:username', deleteUser);


export default router;