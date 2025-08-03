import express from 'express'
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'Welcome to Mediraksha', user: req.user });
});

export default router;