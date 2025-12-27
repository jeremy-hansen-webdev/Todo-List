import { useCallback, useMemo, useRef } from 'react';
import useInfiniteTodos from '../hooks/useInfiniteTodos';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function TodoList() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteTodos();

  const flatTodos = useMemo(() => data?.pages.flatMap((p) => p) ?? [], [data]);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = useCallback(() => {
    // guard here so observer hook stays generic
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useIntersectionObserver(loadMoreRef, handleIntersect, {
    enabled: !!hasNextPage,
    rootMargin: '300px',
    threshold: 0,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error when getting Todo List.</p>;

  return (
    <div>
      <h1 className="mb-14">Todo List</h1>

      <ul>
        {flatTodos.map((todo) => (
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
