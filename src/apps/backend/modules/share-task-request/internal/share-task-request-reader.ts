import {
    GetAllShareTasksRequestParams,
    GetShareTaskRequestParams,
    ShareTaskRequest,
    ShareTaskRequestNotFoundError,
  } from '../types';
  import ShareTaskRequestRepository from './store/share-task-request-repository';
  import ShareTaskRequestUtil from './share-task-request-util';
  
  export default class ShareTaskRequestReader {
    public static async getSharedTaskForAccount(
      params: GetShareTaskRequestParams,
    ): Promise<ShareTaskRequest> {
      const sharedTaskDb = await ShareTaskRequestRepository.findOne({
        _id: params.sharedTaskId,
        account: params.accountId,
      })
      
      if (!sharedTaskDb) {
        throw new ShareTaskRequestNotFoundError(params.sharedTaskId);
      }
  
      return ShareTaskRequestUtil.convertSharedTaskDBToSharedTask(sharedTaskDb);
    }
  
    public static async getSharedTasksForAccount(
      params: GetAllShareTasksRequestParams,
    ): Promise<ShareTaskRequest[]> {
      const sharedTasksDb = await ShareTaskRequestRepository.find({
        account: params.accountId,
      })
        .populate({
          path: 'task',
          match: { active: true },
          populate: {
            path: 'account',
            model: 'accounts',
          },
        })
  
      return sharedTasksDb.map((sharedTaskDb) =>
        ShareTaskRequestUtil.convertSharedTaskDBToSharedTask(sharedTaskDb),
        );
    }
  }
