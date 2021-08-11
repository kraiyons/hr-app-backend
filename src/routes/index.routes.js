import { Router } from 'express';
import registrationRouter from './registration.routes';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

router.use('/register', registrationRouter);

export default router;
