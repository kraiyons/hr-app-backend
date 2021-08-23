import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import _ from 'lodash';

import User, {
  UserInterface,
  UserLoginDto,
  UserSearchRequestDto,
} from '../models/user.model';

async function getUsers(
  req: Request<UserSearchRequestDto>,
  res: Response<Array<UserInterface>>
) {
  const query = User.find();
  const filterQueryArray: Array<FilterQuery<UserInterface>> = new Array<
    FilterQuery<UserInterface>
  >();

  if (req.body.name) {
    filterQueryArray.push({ firstName: { $regex: req.body.name } });
    filterQueryArray.push({ lastName: { $regex: req.body.name } });
    filterQueryArray.push({ middleName: { $regex: req.body.name } });
  }

  if (!_.isEmpty(filterQueryArray)) {
    query.or(filterQueryArray);
  }

  await query
    .sort({ firstName: 1, lastName: 1 })
    .exec()
    .then((students) => {
      return res.send(students);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function insertUser(req: Request<UserInterface>, res: Response) {
  const password = bcrypt.hashSync(req.body.password, 10);
  await User.create({
    email: req.body.email,
    password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    country: req.body.country,
    jobTitle: req.body.jobTitle,
    dateJoined: req.body.dateJoined,
    inactive: req.body.inactive,
  })
    .then((student) => {
      const responseMessage = {
        status: 'success',
        message: `Succesfully inserted the user: ${student._id}`,
      };
      return res.status(200).send({ responseMessage });
    })
    .catch((err) => {
      const responseMessage = {
        status: 'failure',
        message: err,
      };
      return res.status(400).send(responseMessage);
    });
}

async function login(req: Request<UserLoginDto>, res: Response) {
  const query = User.findOne();
  const filterQueryArray: Array<FilterQuery<UserInterface>> = new Array<
    FilterQuery<UserInterface>
  >();

  if (req.body.email) {
    filterQueryArray.push({ email: { $regex: req.body.email } });
  }

  if (!_.isEmpty(filterQueryArray)) {
    query.or(filterQueryArray);
  }

  await query
    .exec()
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const { JWT_SECRET } = process.env;
          const token = jwt.sign(
            { user_id: user._id, email: user.email },
            JWT_SECRET,
            {
              expiresIn: '2h',
            }
          );
          return res.status(200).send({
            status: 'success',
            message: 'Succesfull login',
            token,
          });
        }
      }
      return res.status(400).send({
        status: 'failed',
        message: 'You have supplied invalid credentials.',
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export { getUsers, insertUser, login };
