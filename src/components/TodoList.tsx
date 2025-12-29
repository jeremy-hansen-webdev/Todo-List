import { useCallback, useMemo, useRef, useState } from 'react';
import useInfiniteTodos from '../hooks/useInfiniteTodos';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import type { Todo } from '../services/apiClient';
import FilterUsers from './FilterUsers';
import AddToList from './AddToList';

export default function TodoList() {
  const [userId, setUserId] = useState<number | undefined>(undefined);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteTodos(userId);

  // @ts-expect-error: Not sure
  const flatTodos = useMemo(() => data?.pages.flatMap((p) => p) ?? [], [data]);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = useCallback(() => {
    // guard here so observer hook stays generic
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useIntersectionObserver(loadMoreRef, handleIntersect, {
    enabled: !!hasNextPage,
    rootMargin: '100px',
    threshold: 0,
  });

  const handleFilterSelect = (userId: number | undefined) => {
    setUserId(userId);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error when getting Todo List.</p>;

  return (
    <div>
      <h1 className="mb-14">Todo List</h1>

      <FilterUsers handleFilterSelect={handleFilterSelect} />

      <AddToList userId={userId} />

      <ul>
        {flatTodos.map((todo: Todo) => (
          <li className="mb-14" key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>

      <div ref={loadMoreRef} style={{ height: 1 }} />

      {isFetchingNextPage && <p>Loading more...</p>}
      {!hasNextPage && <p>All caught up ✅</p>}
    </div>
  );
}
