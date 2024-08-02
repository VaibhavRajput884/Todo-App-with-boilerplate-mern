import ShareTaskRequestReader from './internal/share-task-request-reader';
import ShareTaskRequestWriter from './internal/share-task-request-writer';
import {
  CreateShareTaskRequestParams,
  GetAllShareTasksRequestParams,
  ShareTaskRequest,
} from './types';

export default class ShareTaskRequestService {
  public static async createSharedTask(
    params: CreateShareTaskRequestParams,
  ): Promise<ShareTaskRequest> {
    return ShareTaskRequestWriter.createSharedTask(params);
  }

  public static async getSharedTasksForAccount(
    params: GetAllShareTasksRequestParams,
  ): Promise<ShareTaskRequest[]> {
    return ShareTaskRequestReader.getSharedTasksForAccount(params);
  }
}
