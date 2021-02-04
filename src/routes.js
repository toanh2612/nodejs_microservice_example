import { Router } from 'express';
import userRoute from './routes/userRoute';

const router = Router();

router.use('/users', userRoute);

export default router;