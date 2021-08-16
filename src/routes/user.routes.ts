import { Request, Response, Router } from 'express';
import { UserInterface, UserSearchRequestDto } from '../models/user.model';
import { getUsers, insertUser } from '../services/user.service';
const userRouter = Router();

/**
 * POST: Get Students list
 */
userRouter.post(
  '/list',
  (req: Request<UserSearchRequestDto>, res: Response) => {
    getUsers(req, res);
  }
);

/**
 * POST: Get Students list
 */
userRouter.post('/', (req: Request<UserInterface>, res: Response) => {
  insertUser(req, res);
});

export default userRouter;
