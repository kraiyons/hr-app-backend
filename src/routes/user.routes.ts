import { Request, Response, Router } from 'express';
import { UserSearchRequestDto } from '../models/user.model';
import { getUsers } from '../services/user.service';
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

export default userRouter;
