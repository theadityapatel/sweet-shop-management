import express from 'express';
import {
  createSweet,
  listSweets,
  purchaseSweet,
  restockSweet
} from '../controllers/sweetController';
import { authenticate, authorizeAdmin } from '../middlewares/auth';


const router = express.Router();

// 🔐 protect all sweet routes
router.use(authenticate);

router.post('/', createSweet);
router.get('/', listSweets);

// ✅ PURCHASE ROUTE (THIS WAS MISSING / NOT REGISTERED)
router.post('/:id/purchase', purchaseSweet);
router.post('/:id/restock', authorizeAdmin, restockSweet);


export default router;
