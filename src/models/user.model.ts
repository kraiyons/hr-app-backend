import { ObjectId } from 'mongodb';
import mongoose, { Schema, Document, Collection } from 'mongoose';

export interface UserSearchRequestDto {
  name: string;
}

export interface UserInterface extends Document {
  _id: ObjectId;
  email: String;
  password: String;
  firstName: String;
  lastName: String;
  middleName: String;
  dateOfBirth: Date;
  country: String;
  jobTitle: String;
  dateJoined: Date;
  inactive: Boolean;
}

const UserSchema: Schema = new Schema(
  {
    _id: { type: ObjectId, unique: true },
    email: { type: String, required: false },
    password: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    middleName: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    country: { type: String, required: false },
    jobTitle: { type: String, required: false },
    dateJoined: { type: Date, required: false },
    inactive: { type: Boolean, default: false },
  },
  {
    collection: 'users', // Without this attribute the collection won't be retrieved
  }
);

// model name, schema, ?collection name
const User = mongoose.model<UserInterface>('user', UserSchema);
export default User;
