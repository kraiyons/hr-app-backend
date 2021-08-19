import { Request, Response, Router } from 'express';
import {
  UserInterface,
  UserLoginDto,
  UserSearchRequestDto,
} from '../models/user.model';
import { getUsers, insertUser, login } from '../services/user.service';
const userRouter = Router();

userRouter.post(
  '/list',
  (req: Request<UserSearchRequestDto>, res: Response) => {
    getUsers(req, res);
  }
);

userRouter.post('/', (req: Request<UserInterface>, res: Response) => {
  insertUser(req, res);
});

userRouter.post('/login', (req: Request<UserLoginDto>, res: Response) => {
  login(req, res);
});

export default userRouter;
