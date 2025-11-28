import { Router } from 'express';

import auth from './auth';
import users from './users';

import horses from './horses';
import trainingAplications from './TrainingAplications';
import tradeReports from './TradeReports';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);

router.use('/horses', horses);
router.use('/training-aplications', trainingAplications);
router.use('/trade-reports', tradeReports);

export default router;
