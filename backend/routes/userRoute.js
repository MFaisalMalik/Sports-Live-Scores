import express from 'express';

import {
  createUser,
  loginAdmin
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.post('/admin/login', loginAdmin);

export default router;