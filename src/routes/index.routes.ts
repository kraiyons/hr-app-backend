import { Router } from 'express';
import userRoutes from './user.routes';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

router.use('/user', userRoutes);

export default router;
