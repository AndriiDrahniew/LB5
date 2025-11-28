import { Router } from 'express';
import { createHorse, getHorses, getHorseById, updateHorse, deleteHorse } from '../../controllers/HorsesController';

const router = Router();

router.post('/', createHorse);
router.get('/', getHorses);
router.get('/:id', getHorseById);
router.put('/:id', updateHorse);
router.delete('/:id', deleteHorse);

export default router;