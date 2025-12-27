import { useInfiniteQuery } from '@tanstack/react-query';
import { getTodosPages, type Todo } from '../services/apiClient';

const LIMIT = 15;

export default function useInfiniteTodos() {
  return useInfiniteQuery<Todo[], Error, Todo[], ['todos'], number>({
    queryKey: ['todos'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getTodosPages(pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < LIMIT ? undefined : allPages.length + 1,
  });
}
