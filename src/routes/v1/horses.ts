import { Router } from 'express';
import { HorsesController } from '../../controllers/HorsesController';

const router = Router();

router.post('/', HorsesController.create);
router.get('/', HorsesController.getAll);
router.get('/:id', HorsesController.getById);
router.put('/:id', HorsesController.update);
router.delete('/:id', HorsesController.delete);

export default router;