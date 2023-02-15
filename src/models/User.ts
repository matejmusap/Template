import { Document, model, Schema } from "mongoose";

enum Role {
  Admin= "Admin",
  Editor="Editor",
  Guest="Guest"
}

export type TUser = {
  email: string;
  password: string;
  role: Role
  fullName: String
  alias: String
};

export interface IUser extends TUser, Document {}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Editor', 'Guest'],
    required: true,
  },
  fullName: {
    type: String,
    required: false,
  },
  alias: {
    type: String,
    required: false,
  },
});

const User = model<IUser>("User", userSchema);

export default User;