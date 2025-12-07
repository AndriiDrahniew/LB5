import { Router } from 'express';
import { TradeReportsController } from '../../controllers/TradeReportsControllers';

const router = Router();

router.post('/', TradeReportsController.create);
router.get('/', TradeReportsController.getAll);
router.get('/:id', TradeReportsController.getById);
router.patch('/:id', TradeReportsController.update);
router.delete('/:id', TradeReportsController.delete);

export default router;