import User, {
  UserInterface,
  UserSearchRequestDto,
} from '../models/user.model';
import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import mongoose from 'mongoose';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

async function getUsers(
  req: Request<UserSearchRequestDto>,
  res: Response<Array<UserInterface>>
) {
  const query = User.find();
  const filterQueryArray: Array<FilterQuery<UserInterface>> = new Array<
    FilterQuery<UserInterface>
  >();
  filterQueryArray.push({ inactive: { $ne: true } });

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
      console.log('**** SUCCESS');
      return res.send(students);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function insertUser(req: Request<UserInterface>, res: Response) {
  req.body._id = new mongoose.Types.ObjectId();
  await User.create({
    _id: req.body._id,
    email: req.body.email,
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

export { getUsers, insertUser };
