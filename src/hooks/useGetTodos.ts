import { useInfiniteQuery } from '@tanstack/react-query';
import { getTodosPages, type Todo } from '../services/apiClient';

const LIMIT = 15;

export default function useTodos() {
  return useInfiniteQuery<Todo[], Error, Todo[], ['todos'], number>({
    queryKey: ['todos'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getTodosPages(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // if the API returns fewer than LIMIT items, we're at the end
      if (lastPage.length < LIMIT) return undefined;
      return allPages.length + 1; // next page number
    },
  });
}
