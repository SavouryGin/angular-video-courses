import { Course } from '../../models/course';

export interface CoursesState {
  courses: Course[];
  totalLength: number;
  error: string | null;
  loading: boolean;
}

export const initialCoursesState: CoursesState = {
  courses: [],
  totalLength: 0,
  error: null,
  loading: false,
};
