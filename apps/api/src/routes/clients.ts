import { Router } from 'express';
import { clientController } from '../controllers/client.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', clientController.getClients);
router.get('/:id', clientController.getClient);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

export default router; 