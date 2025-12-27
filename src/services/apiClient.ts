import axios from 'axios';

export interface Todo {
  userId: number;
  id: number;
  title: string;
}

const LIMIT = 15;

export async function getTodosPages(page: number): Promise<Todo[]> {
  const res = await axios.get<Todo[]>(
    'https://jsonplaceholder.typicode.com/posts',
    { params: { _page: page, _limit: LIMIT } },
  );
  return res.data;
}
