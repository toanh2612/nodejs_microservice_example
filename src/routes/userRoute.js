import { Router } from 'express';
import userController from '../controllers/userController';
import userValidation from '../validations/userValidation';
const router = Router();

router.post('/', userValidation.create, userController.post);
router.get('/', userValidation.filter, userController.getAll);
router.get('/list', userValidation.filter, userController.getList);
router.get('/:id', userController.getOne);
router.put('/:id', userValidation.update, userController.update);
router.delete('/:id', userController.delete);
export default router;