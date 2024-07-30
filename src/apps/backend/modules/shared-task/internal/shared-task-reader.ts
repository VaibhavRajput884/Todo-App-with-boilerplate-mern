import {
    GetAllSharedTasksParams,
    GetSharedTaskParams,
    SharedTask,
    SharedTaskNotFoundError,
  } from '../types';
  import SharedTaskRepository from './store/shared-task-repository';
  import SharedTaskUtil from './shared-task-util';
  
  export default class SharedTaskReader {
    public static async getSharedTaskForAccount(
      params: GetSharedTaskParams,
    ): Promise<SharedTask> {
      const sharedTaskDb = await SharedTaskRepository.findOne({
        _id: params.sharedTaskId,
        account: params.accountId,
      })
      
      if (!sharedTaskDb) {
        throw new SharedTaskNotFoundError(params.sharedTaskId);
      }
  
      return SharedTaskUtil.convertSharedTaskDBToSharedTask(sharedTaskDb);
    }
  
    public static async getSharedTasksForAccount(
      params: GetAllSharedTasksParams,
    ): Promise<SharedTask[]> {
      const sharedTasksDb = await SharedTaskRepository.find({
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
          SharedTaskUtil.convertSharedTaskDBToSharedTask(sharedTaskDb),
        );
    }
  }
  