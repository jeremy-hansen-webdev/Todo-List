import { useEffect, useRef } from 'react';
import useTodos from '../hooks/useGetTodos';
import type { Todo } from '../services/apiClient';

const TodoList = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTodos();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first.isIntersecting) return;

        // avoid duplicate calls
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: '300px', threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error when getting Todo List.</p>;

  const flatTodos = data?.pages?.flatMap((page) => page) ?? [];

  return (
    <div>
      <h1 className="mb-14">Todo List</h1>

      <ul>
        {flatTodos.map((todo: Todo) => (
          <li className="mb-14" key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>

      {/* ✅ This is the sentinel element the observer watches */}
      <div ref={loadMoreRef} style={{ height: 1 }} />

      {isFetchingNextPage && <p>Loading more...</p>}
      {!hasNextPage && <p>All caught up ✅</p>}
    </div>
  );
};

export default TodoList;
