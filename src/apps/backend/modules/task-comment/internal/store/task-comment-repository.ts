import { ApplicationRepository } from '../../../application';

import { CommentDB, CommentDbSchema } from './task-comment-db';

const CommentRepository = ApplicationRepository<CommentDB>(
  'Comment',
  CommentDbSchema,
);

export default CommentRepository;
