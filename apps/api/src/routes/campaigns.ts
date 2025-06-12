import { Router } from 'express';
import {
  getCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from '../controllers/campaign.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getCampaigns);
router.get('/:id', getCampaign);
router.post('/', createCampaign);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

export default router; 