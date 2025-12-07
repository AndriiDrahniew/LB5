import { Router } from 'express';
import { TrainingAplicationsController } from '../../controllers/TrainingAplicationsController';

const router = Router();

router.post('/', TrainingAplicationsController.create);
router.get('/', TrainingAplicationsController.getAll);
router.get('/:id', TrainingAplicationsController.getById);
router.patch('/:id', TrainingAplicationsController.update);
router.delete('/:id', TrainingAplicationsController.delete);

export default router;