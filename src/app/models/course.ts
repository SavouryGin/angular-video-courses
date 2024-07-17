import { Author } from './author';

export interface Course {
  id: string;
  name: string;
  date: string;
  length: number;
  authors: Author[];
  description?: string;
  isTopRated?: boolean;
}

export interface CoursesResponse {
  content: Course[];
  page: number | null;
  pageSize: number | null;
  totalLength: number;
}
