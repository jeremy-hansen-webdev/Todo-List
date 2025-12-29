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

export class ApiClient<T> {
  LIMIT = 15;
  baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  async getTodosPages(page: number, userId?: number): Promise<T[]> {
    const res = await axios.get<T[]>(this.baseUrl, {
      params: {
        _page: page,
        _limit: this.LIMIT,
        ...(userId ? { userId } : {}),
      },
    });
    return res.data;
  }

  async addTodoPost(newPost: AddTodoPost): Promise<T> {
    const res = await axios.post<T>(this.baseUrl, newPost);
    return res.data;
  }
}
