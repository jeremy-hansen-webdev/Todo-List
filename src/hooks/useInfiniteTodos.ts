import { useInfiniteQuery } from '@tanstack/react-query';
import { ApiClient, type Todo } from '../services/apiClient';
import { CACHE_KEY_TODOS } from '../services/constants';



const LIMIT = 15;

export default function useInfiniteTodos(userId?: number) {
  const apiClient = new ApiClient();
  return useInfiniteQuery<
    Todo[],
    Error,
    Todo[],
    [typeof CACHE_KEY_TODOS, number?],
    number
  >({
    queryKey: [CACHE_KEY_TODOS, userId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      apiClient.getTodosPages(pageParam, userId) as Promise<Todo[]>,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < LIMIT ? undefined : allPages.length + 1,
  });
}
