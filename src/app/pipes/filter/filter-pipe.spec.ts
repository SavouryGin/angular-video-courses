import { FilterPipe } from '.';
import { Course } from '../../models/course';

describe('FilterPipe', () => {
  let pipe: FilterPipe;
  let courses: Course[];

  beforeEach(() => {
    pipe = new FilterPipe();
    courses = [
      {
        id: '1',
        name: 'Angular Basics',
        date: '2023-12-01',
        length: 60,
        authors: [],
      },
      {
        id: '2',
        name: 'Advanced Angular',
        date: '2023-12-01',
        length: 120,
        authors: [],
      },
      {
        id: '3',
        name: 'React for Beginners',
        date: '2023-12-01',
        length: 90,
        authors: [],
      },
    ];
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter courses by name', () => {
    expect(pipe.transform(courses, 'angular').length).toBe(2);
    expect(pipe.transform(courses, 'react').length).toBe(1);
  });

  it('should return all courses if query is empty', () => {
    expect(pipe.transform(courses, '').length).toBe(3);
  });

  it('should return an empty array if no courses match the query', () => {
    expect(pipe.transform(courses, 'vue').length).toBe(0);
  });
});
