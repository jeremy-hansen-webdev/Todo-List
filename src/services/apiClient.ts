import axios from 'axios';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  body?: string;
}

export interface AddTodoPost {
  title: string;
  body: string;
  userId: number;
}


const LIMIT = 15;

export async function getTodosPages(
  page: number,
  userId?: number,
): Promise<Todo[]> {
  const res = await axios.get<Todo[]>(
    'https://jsonplaceholder.typicode.com/posts',
    { params: { _page: page, _limit: LIMIT, ...(userId ? { userId } : {}) } },
  );
  return res.data;
}

export async function addTodoPost(newPost:AddTodoPost): Promise<Todo> {  
  const res = await axios.post<Todo>(
    'https://jsonplaceholder.typicode.com/posts',
    newPost
  );
  return res.data
}

