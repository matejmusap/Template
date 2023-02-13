import { Document, model, Schema } from "mongoose";

enum Role {
  Admin= "Admin",
  Editor="Editor",
  Guest="Guest"
}

/**
 * Type to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param avatar:string
 * @param avatar:role
 */

export type TUser = {
  email: string;
  password: string;
  avatar: string;
  role: Role
};

/**
 * Mongoose Document based on TUser for TypeScript.
 * https://mongoosejs.com/docs/documents.html
 *
 * TUser
 * @param email:string
 * @param password:string
 * @param avatar:string
 */

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

/**
 * Mongoose Model based on TUser for TypeScript.
 * https://mongoosejs.com/docs/models.html
 *
 * TUser
 * @param email:string
 * @param password:string
 * @param avatar:string
 */

const User = model<IUser>("User", userSchema);

export default User;