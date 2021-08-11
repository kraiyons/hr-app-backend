import User, {
  UserInterface,
  UserSearchRequestDto,
} from '../models/user.model';
import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import mongoose from 'mongoose';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

/**
 * Search Students by name or skills
 *
 * @param req
 * @param res
 */
async function getStudents(
  req: Request<UserSearchRequestDto>,
  res: Response<Array<UserInterface>>
) {
  const query = Student.find();
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

/**
 * Insert new Student
 *
 * @param req
 * @param res
 */
async function insertStudent(req: Request<StudentInterface>, res: Response) {
  //req.body._id = new mongoose.Types.ObjectId();
  req.body._id = uuidv4();
  console.log(`_ID: ${req.body._id}`);
  await User.create({
    _id: req.body._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    country: req.body.country,
    skills: req.body.skills,
  })
    .then((student) => {
      return res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
    });
}
