import React, { useEffect, useState } from 'react';
import {
  HeadingMedium,
  VerticalStackLayout,
  Spinner,
  LabelLarge,
  ParagraphSmall,
} from '../../components';
import SharedTaskService from '../../services/shared-task.service';
import { SharedTask } from '../../types/shared-task';
import { AsyncError } from '../../types';
import { toast } from 'react-hot-toast';
import CommentList from '../tasks/comment-list';
import AddComment from '../tasks/add-comment';

const sharedTaskService = new SharedTaskService();

const SharedTasks: React.FC = () => {
  const [sharedTasks, setSharedTasks] = useState<SharedTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSharedTasks = async () => {
      setIsLoading(true);
      try {
        const response = await sharedTaskService.getSharedTasks();
        setSharedTasks(response.data);
      } catch (error) {
        toast.error((error as AsyncError).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSharedTasks();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto h-screen max-w-screen-2xl overflow-y-auto p-4 md:p-6 2xl:p-10">
      <div className="mx-auto max-w-5xl">
        <VerticalStackLayout gap={7}>
          <HeadingMedium>Shared Tasks</HeadingMedium>
          {sharedTasks.map((sharedTask) => (
            <div
              className="relative rounded-sm border border-stroke bg-white p-9 shadow-default"
              key={sharedTask.id}
            >
              <VerticalStackLayout gap={3}>
                <LabelLarge>{sharedTask.task.title}</LabelLarge>
                <ParagraphSmall>{sharedTask.task.description}</ParagraphSmall>
                <ParagraphSmall>
                  Shared by:{' '}
                  {`${sharedTask.task.account.firstName} ${sharedTask.task.account.lastName} (${sharedTask.task.account.username})`}
                </ParagraphSmall>
                <CommentList taskId={sharedTask.task.id} />
                <AddComment taskId={sharedTask.task.id} />
              </VerticalStackLayout>
            </div>
          ))}
        </VerticalStackLayout>
      </div>
    </div>
  );
};

export default SharedTasks;