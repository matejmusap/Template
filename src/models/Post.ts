import { Document, model, Schema } from "mongoose";

export type TPost = {
  userId: string;
  content: string;
  created: Date;
  blocked?: Date;
  edited?: Date
};

export interface IPost extends TPost, Document {}

const postSchema: Schema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true,
  },
  short: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  viewed: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String,
    required: true,
  },
  breakingNews: {
    type: Date,
    required: false,
  },
  created: {
    type: Date,
    default: new Date(),
    required: true,
  }
});

const Post = model<IPost>("Post", postSchema);

export default Post;