import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  ApiClient,
  type AddTodoPost,
  type Todo,
} from '../services/apiClient';
import { CACHE_KEY_TODOS } from '../services/constants';

export const useAddTodoList = (userId?: number) => {
  const queryClient = useQueryClient();

  const apiClient = new ApiClient<Todo>()

  return useMutation<Todo, Error, AddTodoPost>({
    mutationFn: (newPost) => apiClient.addTodoPost(newPost),

    onSuccess: (created) => {
      queryClient.setQueryData<InfiniteData<Todo[], number>>(
        [CACHE_KEY_TODOS, userId],
        (old) => {
          if (!old) return old;

          if (userId && created.userId !== userId) return old;

          const firstPage = old.pages[0] ?? [];
          const newFirstPage = [created, ...firstPage];

          return {
            ...old,
            pages: [newFirstPage, ...old.pages.slice(1)],
          };
        },
      );
    },
    onError: (error) => {
      console.error('Error createing post:', error);
    },
  });

};
