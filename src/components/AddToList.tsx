import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  addTodoPost,
  type AddTodoPost,
  type Todo,
} from '../services/apiClient';

interface Props {
  userId?: number;
}

const AddToList = ({ userId }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTodoPost,

    onSuccess: (created) => {
      queryClient.setQueryData<InfiniteData<Todo[]>>(
        ['todos', userId],
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

      //   queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Error createing post:', error);
    },
  });

  const handlePost = () => {
    const newPost: AddTodoPost = {
      title: 'Hello World',
      body: 'Testing body',
      userId: 1,
    };
    mutation.mutate(newPost);
  };
  return (
    <div>
      <button
        className="bg-zinc-500 text-zinc-50 px-2 m-4 cursor-pointer"
        onClick={handlePost}
      >
        Add Post
      </button>
      {mutation.isPending && <p>Saving...</p>}
      {mutation.isError && <p>Error creating post</p>}
      {mutation.isSuccess && <p>Post saved ✅</p>}
    </div>
  );
};

export default AddToList;
