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
        title: 'Angular Basics',
        creationDate: new Date(),
        duration: 60,
      },
      {
        id: '2',
        title: 'Advanced Angular',
        creationDate: new Date(),
        duration: 120,
      },
      {
        id: '3',
        title: 'React for Beginners',
        creationDate: new Date(),
        duration: 90,
      },
    ];
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter courses by title', () => {
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
