import { Schema, Types } from 'mongoose';

export interface ShareTaskRequestDB {
  _id: Types.ObjectId;
  task: Types.ObjectId;
  account: Types.ObjectId;
  status: 'pending' | 'approved' | 'declined';
}

export const ShareTaskRequestDbSchema: Schema = new Schema<ShareTaskRequestDB>(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      index: true,
      required: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      index: true,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'declined'],
      default: 'approved', 
      required: true,
    },

  },
  {
    collection: 'share-task-request',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
