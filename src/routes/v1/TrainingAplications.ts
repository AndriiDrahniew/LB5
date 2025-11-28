import { Router } from 'express';
import { createTrainingAplication, getTrainingAplications, getTrainingAplicationById, updateTrainingAplication, deleteTrainingAplication } from '../../controllers/TrainingAplicationsController';

const router = Router();

router.post('/', createTrainingAplication);
router.get('/', getTrainingAplications);
router.get('/:id', getTrainingAplicationById);
router.put('/:id', updateTrainingAplication);
router.delete('/:id', deleteTrainingAplication);

export default router;