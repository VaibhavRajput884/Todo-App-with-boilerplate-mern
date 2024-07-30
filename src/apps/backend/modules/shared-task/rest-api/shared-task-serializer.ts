import { Account } from '../../account/types';
import { Task } from '../../task/types';
import { SharedTask } from '../types';

export function serializeSharedTaskAsJSON(sharedTask: SharedTask): object {
  const task = sharedTask.task as Task;
  const account = sharedTask.account as Account;

  return {
    id: sharedTask.id,
    task:{
      id: task.id,
      title: task.title,
      description: task.description,
      account:{
        id: account.id,
        firstName: account.firstName,
        lastName: account.lastName,
        username: account.username,
                  
          },
        },
      account: account,
  };
}
