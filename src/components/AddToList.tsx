import { type AddTodoPost } from '../services/apiClient';
import { useAddTodoList } from '../hooks/useAddToList';
import { useRef, useState } from 'react';

export interface IdProp {
  userId?: number;
}

const AddToList = ({ userId }: IdProp) => {
  const mutation = useAddTodoList(userId);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const titleRef = useRef<HTMLInputElement>(null)

  const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const newPost: AddTodoPost = {
      title: title,
      body: body,
      userId: userId ?? 1,
    };

    mutation.mutate(newPost);

    setTitle('');
    setBody('');
    if (titleRef.current) {
      titleRef.current.focus();
    }
  };

  return (
    <div>
      <form onSubmit={handlePost}>
        <label htmlFor="title">Title</label>
        <input
          className="border ml-5 my-5"
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="Title"
          value={title}
          ref={titleRef}
        />
        <br />
        <label htmlFor="body">Description</label>
        <input
          className="border ml-5"
          onChange={(e) => setBody(e.target.value)}
          type="text"
          name="body"
          value={body}
        />
        <br />
        <button className="bg-zinc-500 text-zinc-50 px-2 m-4 cursor-pointer">
          Add Post
        </button>
      </form>
      {mutation.isPending && <p>Saving...</p>}
      {mutation.isError && <p>Error creating post</p>}
      {mutation.isSuccess && <p>Post saved ✅</p>}
    </div>
  );
};

export default AddToList;
