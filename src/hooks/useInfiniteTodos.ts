import { useInfiniteQuery } from '@tanstack/react-query';
import { getTodosPages, type Todo } from '../services/apiClient';

const LIMIT = 15;

export default function useInfiniteTodos(userId?: number) {
  return useInfiniteQuery<Todo[], Error, Todo[], ['todos', number?], number>({
    queryKey: ['todos', userId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getTodosPages(pageParam, userId),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < LIMIT ? undefined : allPages.length + 1,
  });
}
