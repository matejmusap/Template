import { Document, model, Schema } from "mongoose";

export type TComment = {
  userId: string;
  content: string;
  created: Date;
  blocked?: Date;
  edited?: Date
};

export interface IComment extends TComment, Document {}

const commentSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  blocked: {
    type: Date,
    required: false,
  },
  created: {
    type: Date,
    default: new Date(),
    required: true,
  },
  edited: {
    type: Date,
    required: false,
  }
});

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;