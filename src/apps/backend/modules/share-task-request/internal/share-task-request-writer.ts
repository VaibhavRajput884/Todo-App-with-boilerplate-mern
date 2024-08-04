import { ShareTaskRequest, CreateShareTaskRequestParams, ShareTaskRequestStatus } from '../types';

import ShareTaskRequestRepository from './store/share-task-request-repository';
import ShareTaskRequestUtil from './share-task-request-util';

export default class ShareTaskRequestWriter {
  public static async createSharedTask(
    params: CreateShareTaskRequestParams,
  ): Promise<ShareTaskRequest> {
    const createdSharedTask = await ShareTaskRequestRepository.create({
      task: params.taskId,
      account: params.accountId,
      status: ShareTaskRequestStatus.Approved,
    });
    return ShareTaskRequestUtil.convertShareTaskDBRequestToShareTaskRequest(createdSharedTask);
  }
}
