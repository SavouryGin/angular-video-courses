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

export interface Author {
  id: string;
  name: string;
}
