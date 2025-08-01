import express from 'express'
const router = express.Router();



// Protected route
router.get('/', (req, res) => {
  res.json({ msg: 'Welcome to protected route!', user: req.user });
});

export default router;