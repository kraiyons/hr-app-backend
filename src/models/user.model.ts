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
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    country: { type: String, required: true },
    jobTitle: { type: String, required: true },
    dateJoined: { type: Date, required: true },
    inactive: { type: Boolean, default: true },
  },
  {
    collection: 'users', // Without this attribute the collection won't be retrieved
  }
);

// model name, schema, ?collection name
const User = mongoose.model<UserInterface>('user', UserSchema);
export default User;
