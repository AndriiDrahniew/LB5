import { Router } from 'express';
import { createTradeReport, getTradeReports, getTradeReportById, updateTradeReport, deleteTradeReport } from '../../controllers/TradeReportsControllers';

const router = Router();

router.post('/', createTradeReport);
router.get('/', getTradeReports);
router.get('/:id', getTradeReportById);
router.put('/:id', updateTradeReport);
router.delete('/:id', deleteTradeReport);

export default router;