import { ApplicationServer } from '../../application';

import CommentRouter from './task-comment-router';

export default class CommentServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new CommentRouter();

    server.use('/tasks/:taskId/comments', router.router);
  }
}
