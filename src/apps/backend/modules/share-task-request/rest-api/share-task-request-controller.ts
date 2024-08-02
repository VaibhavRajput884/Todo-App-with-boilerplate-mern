import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import ShareTaskRequestService from '../share-task-request-service';
import {
  GetAllShareTasksRequestParams,
  CreateShareTasksRequestParams,
} from '../types';
import { serializeSharedTaskAsJSON } from './share-task-request-serializer';

export class ShareTaskRequestController {
  createSharedTask = applicationController(
    async (req: Request<CreateShareTasksRequestParams>, res: Response) => {
      const { taskId, accountIds } = req.body;
      const sharedTasks = await Promise.all(
        accountIds.map((accountId) => 
          ShareTaskRequestService.createSharedTask({ taskId, accountId })
        )
      );
      const sharedTasksJSON = sharedTasks.map(serializeSharedTaskAsJSON);

      res.status(HttpStatusCodes.CREATED).send(sharedTasksJSON);
    },
  );

  getSharedTasks = applicationController(
    async (req: Request, res: Response) => {
      const params: GetAllShareTasksRequestParams = { accountId: req.accountId };
      const sharedTasks = await ShareTaskRequestService.getSharedTasksForAccount(params);
      const sharedTasksJSON = sharedTasks.map(serializeSharedTaskAsJSON);

      res.status(HttpStatusCodes.OK).send(sharedTasksJSON);
    },
  );
}
