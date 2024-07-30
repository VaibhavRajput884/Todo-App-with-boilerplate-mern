import { SharedTask } from '../types';
import { SharedTaskDB } from './store/shared-task-db';
import { Task } from '../../task/types';
import { Account } from '../../account/types';
import { Types } from 'mongoose';

export default class SharedTaskUtil {
  public static convertSharedTaskDBToSharedTask(
    sharedTaskDb: SharedTaskDB,
  ): SharedTask {
    const sharedTask = new SharedTask();
    sharedTask.id = sharedTaskDb._id.toString();
    sharedTask.task=SharedTaskUtil.convertTask(sharedTaskDb.task);
    sharedTask.account=SharedTaskUtil.convertAccount(sharedTaskDb.account);
    return sharedTask;
  }

  private static convertTask(task: Types.ObjectId | Task): string | Task {
    if (Types.ObjectId.isValid(task.toString())) {
      return task.toString();
    } else {
      const convertedTask = task as Task;
      return {
        id: convertedTask.id,
        account: convertedTask.account,
        description: convertedTask.description,
        title: convertedTask.title,
      } as Task;
    }
  }

  private static convertAccount(
    account: Types.ObjectId | Account,
  ): string | Account {
    if (Types.ObjectId.isValid(account.toString())) {
      return account.toString();
    } else {
      const convertedAccount = account as Account;
      return {
        id: convertedAccount.id,
        firstName: convertedAccount.firstName,
        lastName: convertedAccount.lastName,
        username: convertedAccount.username,
      } as Account;
    }
  }
}