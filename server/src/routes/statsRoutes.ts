import { Router } from 'express';
import { getPlatformSummary, getTestUser } from '../controllers/stats';

const router = Router();

router.get('/platform-summary', getPlatformSummary);
router.get('/test-user', getTestUser);

export default router;
