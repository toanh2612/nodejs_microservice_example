import { Router } from 'express';
import githubRoute from './web/routes/githubRoute';
const router = Router();

router.use('/github', githubRoute);
export default router;