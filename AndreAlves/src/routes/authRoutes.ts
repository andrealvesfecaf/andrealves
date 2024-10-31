import { Router } from 'express';
import { pageLogin } from '../controllers/pagesController';
import { requerimento, log } from '../controllers/authController';

const router = Router();

router.get('/users', pageLogin);
router.post('/login', log)
router.post('/register',requerimento)


export default router;